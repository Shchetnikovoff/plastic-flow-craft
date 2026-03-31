// Vercel Serverless Function — proxies chat to CCS on VPS
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CCS proxy on VPS — same pattern as lifebot
  const CCS_URL = process.env.CCS_URL || 'http://107.172.62.211:8319/v1/chat/completions';
  const CCS_KEY = process.env.CCS_KEY || 'ccs-internal-managed';

  try {
    const { messages, max_tokens = 500, temperature = 0.7 } = req.body;

    const response = await fetch(CCS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CCS_KEY}`,
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        messages,
        max_tokens,
        temperature,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
