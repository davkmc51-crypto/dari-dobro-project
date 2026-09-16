import json
import os
import re
import psycopg2


def handler(event: dict, context) -> dict:
    '''Принимает заявки "Стать волонтёром" со страницы "Присоединиться" и сохраняет их в базу данных.
    Args: event с httpMethod, body (name, phone, email, skills, message); context с request_id
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

    return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}
