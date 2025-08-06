export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { api_key, api_secret, request_token } = req.body;

  if (!api_key || !api_secret || !request_token) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const crypto = await import('crypto');
  const checksum = crypto.createHash('sha256')
    .update(api_key + request_token + api_secret)
    .digest('hex');

  const response = await fetch("https://api.kite.trade/session/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key, request_token, checksum })
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
