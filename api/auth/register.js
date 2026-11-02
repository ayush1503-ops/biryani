// POST /api/auth/register
// Registers a new user via Supabase Auth.
// Body: { email, password, name? }
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

  const { email, password, name } = body;
  if (!email || !password) {
    res.status(400).json({ error: 'missing_fields', message: 'Email and password are required' });
    return;
  }

  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        options: { data: { name } },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json({ error: 'signup_failed', message: data.msg || data.message || 'Signup failed' });
      return;
    }

    res.status(201).json({
      id: data.user?.id,
      email: data.user?.email,
    });
  } catch (err) {
    res.status(500).json({ error: 'internal_error', message: err.message });
  }
}
