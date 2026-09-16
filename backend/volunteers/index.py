import json
import os
import re
import psycopg2


def handler(event: dict, context) -> dict:
    '''Принимает заявки "Стать волонтёром" со страницы "Присоединиться", отдаёт список и позволяет админу удалять заявки.
    Args: event с httpMethod, body (name, phone, email, skills, message), headers (X-Admin-Token для просмотра/удаления); context с request_id
    Returns: HTTP response с результатом сохранения заявки, списком заявок или результатом удаления
    '''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
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
        phone = str(body.get('phone', '')).strip()
        email = str(body.get('email', '')).strip()
        skills = str(body.get('skills', '')).strip()
        message = str(body.get('message', '')).strip()

        if len(name) < 2:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Укажите имя'})}
        if len(re.sub(r'\D', '', phone)) < 10:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Укажите телефон'})}

        name_esc = name.replace("'", "''")
        phone_esc = phone.replace("'", "''")
        email_esc = email.replace("'", "''")
        skills_esc = skills.replace("'", "''")
        message_esc = message.replace("'", "''")

        conn = psycopg2.connect(dsn)
        try:
            cur = conn.cursor()
            cur.execute(
                f"INSERT INTO {schema}.volunteers (name, phone, email, skills, message) "
                f"VALUES ('{name_esc}', '{phone_esc}', '{email_esc}', '{skills_esc}', '{message_esc}') RETURNING id"
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            cur.close()
        finally:
            conn.close()

        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True, 'id': new_id})}

    if method == 'GET':
        if not is_admin():
            return {'statusCode': 403, 'headers': headers, 'body': json.dumps({'error': 'Доступ запрещён'})}

        conn = psycopg2.connect(dsn)
        try:
            cur = conn.cursor()
            cur.execute(
                f"SELECT id, name, phone, email, skills, message, created_at FROM {schema}.volunteers "
                f"ORDER BY created_at DESC"
            )
            rows = cur.fetchall()
            cur.close()
        finally:
            conn.close()

        items = [
            {
                'id': r[0],
                'name': r[1],
                'phone': r[2],
                'email': r[3],
                'skills': r[4],
                'message': r[5],
                'created_at': r[6].isoformat(),
            }
            for r in rows
        ]
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'items': items})}

    if method == 'DELETE':
        if not is_admin():
            return {'statusCode': 403, 'headers': headers, 'body': json.dumps({'error': 'Доступ запрещён'})}

        params = event.get('queryStringParameters') or {}
        volunteer_id = params.get('id')
        if not volunteer_id:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Не указан id'})}

        conn = psycopg2.connect(dsn)
        try:
            cur = conn.cursor()
            cur.execute(f"DELETE FROM {schema}.volunteers WHERE id = {int(volunteer_id)}")
            conn.commit()
            cur.close()
        finally:
            conn.close()

        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True})}

    return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}