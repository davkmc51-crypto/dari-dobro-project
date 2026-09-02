import json
import os
import re
import psycopg2


def handler(event: dict, context) -> dict:
    '''Принимает заявки "Нужна помощь" с сайта и сохраняет их в базу данных.
    Args: event с httpMethod, body (name, phone, category, message); context с request_id
    Returns: HTTP response с результатом сохранения заявки
    '''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    dsn = os.environ['DATABASE_URL']
    schema = os.environ['MAIN_DB_SCHEMA']

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        name = str(body.get('name', '')).strip()
        phone = str(body.get('phone', '')).strip()
        category = str(body.get('category', '')).strip()
        message = str(body.get('message', '')).strip()

        if len(name) < 2:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Укажите имя'})}
        if len(re.sub(r'\D', '', phone)) < 10:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Укажите телефон'})}
        if len(message) < 10:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Опишите ситуацию подробнее'})}

        name_esc = name.replace("'", "''")
        phone_esc = phone.replace("'", "''")
        category_esc = category.replace("'", "''")
        message_esc = message.replace("'", "''")

        conn = psycopg2.connect(dsn)
        try:
            cur = conn.cursor()
            cur.execute(
                f"INSERT INTO {schema}.help_requests (name, phone, category, message) "
                f"VALUES ('{name_esc}', '{phone_esc}', '{category_esc}', '{message_esc}') RETURNING id"
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            cur.close()
        finally:
            conn.close()

        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True, 'id': new_id})}

    if method == 'GET':
        conn = psycopg2.connect(dsn)
        try:
            cur = conn.cursor()
            cur.execute(
                f"SELECT id, name, phone, category, message, created_at FROM {schema}.help_requests "
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
                'category': r[3],
                'message': r[4],
                'created_at': r[5].isoformat(),
            }
            for r in rows
        ]
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'items': items})}

    return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}
