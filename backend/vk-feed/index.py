import json
import os
import urllib.request
import urllib.parse

VK_API_VERSION = '5.199'
VK_GROUP_ID = 214730320


def vk_photo_url(attachments):
    for att in attachments or []:
        if att.get('type') == 'photo':
            sizes = att.get('photo', {}).get('sizes', [])
            if sizes:
                return sizes[-1]['url']
    return None


def handler(event: dict, context) -> dict:
    '''Получает последние посты сообщества ВКонтакте через VK API (wall.get).
    Args: event с httpMethod; context не используется
    Returns: HTTP response со списком последних постов, общим числом записей и превью-фото
    '''
    method = event.get('httpMethod', 'GET')

    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
        'Content-Type': 'application/json',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    token = os.environ.get('VK_ACCESS_TOKEN', '')
    if not token:
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'success': False, 'error': 'VK_ACCESS_TOKEN не настроен', 'items': [], 'total_count': 0}),
        }

    params = urllib.parse.urlencode({
        'owner_id': -VK_GROUP_ID,
        'count': 6,
        'access_token': token,
        'v': VK_API_VERSION,
    })
    url = f'https://api.vk.com/method/wall.get?{params}'

    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as resp:
            data = json.loads(resp.read().decode('utf-8'))
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'success': False, 'error': str(e), 'items': [], 'total_count': 0}),
        }

    if 'error' in data:
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'success': False,
                'error': data['error'].get('error_msg', 'VK API error'),
                'items': [],
                'total_count': 0,
            }),
        }

    response = data.get('response', {})
    total_count = response.get('count', 0)
    items = []
    for post in response.get('items', []):
        text = (post.get('text') or '').strip()
        if len(text) > 220:
            text = text[:220].rsplit(' ', 1)[0] + '…'
        items.append({
            'id': post.get('id'),
            'text': text,
            'date': post.get('date'),
            'photo': vk_photo_url(post.get('attachments')),
            'url': f"https://vk.com/wall-{VK_GROUP_ID}_{post.get('id')}",
        })

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True, 'total_count': total_count, 'items': items}),
    }
