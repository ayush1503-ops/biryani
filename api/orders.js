// POST /api/orders
// Creates a new order (authenticated).
// Body: { token, items, total, ... }
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey.includes('your_')) {
    res.status(503).json({
      error: 'service_unavailable',
      message: 'Supabase not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY in Vercel project settings.',
    });
    return;
  }

  let body;
  try {
    body = JSON.parse(req.body || '{}');
  } catch (err) {
    res.status(400).json({ error: 'invalid_json' });
    return;
  }

  const { token, ...orderData } = body;
  if (!token) {
    res.status(401).json({ error: 'not_authorized', message: 'No token provided' });
    return;
  }

  try {
    // Verify the user first
    const userResp = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!userResp.ok) {
      res.status(401).json({ error: 'not_authorized', message: 'Token failed' });
      return;
    }

    const user = await userResp.json();

    // Create the order using the service role key for a trusted insert
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey || serviceRoleKey.includes('PASTE_YOUR')) {
      res.status(503).json({
        error: 'service_unavailable',
        message: 'Supabase service role key not configured.',
      });
      return;
    }

    const insertResp = await fetch(`${supabaseUrl}/rest/v1/orders`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
        Accept: 'application/json',
      },
      body: JSON.stringify({ ...orderData, user_id: user.id }),
    });

    if (!insertResp.ok) {
      const text = await insertResp.text();
      res.status(insertResp.status).json({ error: 'order_failed', message: text });
      return;
    }

    const data = await insertResp.json();
    res.status(201).json(data[0] || data);
  } catch (err) {
    res.status(500).json({ error: 'internal_error', message: err.message });
  }
}
