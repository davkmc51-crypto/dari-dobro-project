import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''Принимает отзывы с сайта, отдаёт одобренные отзывы и позволяет админу модерировать (одобрять/удалять).
    Args: event с httpMethod, queryStringParameters, body, headers (X-Admin-Token для модерации); context с request_id
    Returns: HTTP response со списком отзывов или результатом операции
    '''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    dsn = os.environ['DATABASE_URL']
    schema = os.environ['MAIN_DB_SCHEMA']
    admin_token = os.environ.get('REVIEWS_ADMIN_TOKEN', '')

    def is_admin() -> bool:
        req_headers = event.get('headers') or {}
        token = req_headers.get('X-Admin-Token') or req_headers.get('x-admin-token') or ''
        return bool(admin_token) and token == admin_token

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        name = str(body.get('name', '')).strip()
        text = str(body.get('text', '')).strip()
        rating = body.get('rating', 5)

        if len(name) < 2:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Укажите имя'})}
        if len(text) < 10:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Отзыв слишком короткий'})}
        try:
            rating = int(rating)
        except (TypeError, ValueError):
            rating = 5
        rating = max(1, min(5, rating))

        name_esc = name.replace("'", "''")
        text_esc = text.replace("'", "''")

        conn = psycopg2.connect(dsn)
        try:
            cur = conn.cursor()
            cur.execute(
                f"INSERT INTO {schema}.reviews (name, rating, text, is_approved) "
                f"VALUES ('{name_esc}', {rating}, '{text_esc}', FALSE) RETURNING id"
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            cur.close()
        finally:
            conn.close()

        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True, 'id': new_id})}

    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        want_all = params.get('all') == '1'

        if want_all and not is_admin():
            return {'statusCode': 403, 'headers': headers, 'body': json.dumps({'error': 'Доступ запрещён'})}

        conn = psycopg2.connect(dsn)
        try:
            cur = conn.cursor()
            if want_all:
                cur.execute(
                    f"SELECT id, name, rating, text, is_approved, created_at FROM {schema}.reviews "
                    f"ORDER BY created_at DESC"
                )
            else:
                cur.execute(
                    f"SELECT id, name, rating, text, is_approved, created_at FROM {schema}.reviews "
                    f"WHERE is_approved = TRUE ORDER BY created_at DESC LIMIT 30"
                )
            rows = cur.fetchall()
            cur.close()
        finally:
            conn.close()

        items = [
            {
                'id': r[0],
                'name': r[1],
                'rating': r[2],
                'text': r[3],
                'is_approved': r[4],
                'created_at': r[5].isoformat(),
            }
            for r in rows
        ]
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'items': items})}

    if method == 'PUT':
        if not is_admin():
            return {'statusCode': 403, 'headers': headers, 'body': json.dumps({'error': 'Доступ запрещён'})}

        body = json.loads(event.get('body') or '{}')
        review_id = body.get('id')
        approve = bool(body.get('is_approved', True))
        if not review_id:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Не указан id'})}

        conn = psycopg2.connect(dsn)
        try:
            cur = conn.cursor()
            cur.execute(
                f"UPDATE {schema}.reviews SET is_approved = {approve} WHERE id = {int(review_id)}"
            )
            conn.commit()
            cur.close()
        finally:
            conn.close()

        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True})}

    if method == 'DELETE':
        if not is_admin():
            return {'statusCode': 403, 'headers': headers, 'body': json.dumps({'error': 'Доступ запрещён'})}

        params = event.get('queryStringParameters') or {}
        review_id = params.get('id')
        if not review_id:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Не указан id'})}

        conn = psycopg2.connect(dsn)
        try:
            cur = conn.cursor()
            cur.execute(f"DELETE FROM {schema}.reviews WHERE id = {int(review_id)}")
            conn.commit()
            cur.close()
        finally:
            conn.close()

        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True})}

    return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}
