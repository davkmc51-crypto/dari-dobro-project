import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''Принимает вебхуки об успешных платежах от donation.ru и отдаёт общую сумму пожертвований для счётчика на сайте.
    Args: event с httpMethod, headers (X-Webhook-Secret для вебхука), body (данные платежа), queryStringParameters; context с request_id
    Returns: HTTP response с общей суммой (GET) или результатом сохранения платежа (POST)
    '''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Webhook-Secret',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    dsn = os.environ['DATABASE_URL']
    schema = os.environ['MAIN_DB_SCHEMA']
    webhook_secret = os.environ.get('DONATION_WEBHOOK_SECRET', '')

    if method == 'GET':
        conn = psycopg2.connect(dsn)
        try:
            cur = conn.cursor()
            cur.execute(
                f"SELECT COALESCE(SUM(amount), 0) FROM {schema}.donations WHERE status = 'paid'"
            )
            total = cur.fetchone()[0]
            cur.close()
        finally:
            conn.close()

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'total': float(total)}),
        }

    if method == 'POST':
        req_headers = event.get('headers') or {}
        provided_secret = (
            req_headers.get('X-Webhook-Secret')
            or req_headers.get('x-webhook-secret')
            or ''
        )
        params = event.get('queryStringParameters') or {}
        provided_secret = provided_secret or params.get('secret', '')

        if not webhook_secret or provided_secret != webhook_secret:
            return {'statusCode': 403, 'headers': headers, 'body': json.dumps({'error': 'Доступ запрещён'})}

        body = json.loads(event.get('body') or '{}')

        external_id = str(
            body.get('id') or body.get('order_id') or body.get('payment_id') or ''
        ).strip()
        amount_raw = body.get('amount') or body.get('sum') or 0
        status = str(body.get('status') or 'paid').strip().lower()

        try:
            amount = float(amount_raw)
        except (TypeError, ValueError):
            amount = 0.0

        if not external_id:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Не указан id платежа'})}
        if amount <= 0:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Некорректная сумма'})}

        norm_status = 'paid' if status in ('paid', 'success', 'succeeded', 'completed') else status

        external_id_esc = external_id.replace("'", "''")
        status_esc = norm_status.replace("'", "''")
        payload_esc = json.dumps(body, ensure_ascii=False).replace("'", "''")

        conn = psycopg2.connect(dsn)
        try:
            cur = conn.cursor()
            cur.execute(
                f"INSERT INTO {schema}.donations (external_id, amount, status, raw_payload) "
                f"VALUES ('{external_id_esc}', {amount}, '{status_esc}', '{payload_esc}'::jsonb) "
                f"ON CONFLICT (external_id) DO UPDATE SET status = EXCLUDED.status"
            )
            conn.commit()
            cur.close()
        finally:
            conn.close()

        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True})}

    return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}
