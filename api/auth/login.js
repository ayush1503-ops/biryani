// POST /api/auth/login
// Verifies a Supabase JWT and returns the user profile.
// Body: { token: "<supabase access_token>" }
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

  const { token } = body;
  if (!token) {
    res.status(401).json({ error: 'not_authorized', message: 'No token provided' });
    return;
  }

  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      res.status(401).json({ error: 'not_authorized', message: 'Token failed' });
      return;
    }

    const user = await response.json();
    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name,
      role: user.user_metadata?.role || 'customer',
    });
  } catch (err) {
    res.status(500).json({ error: 'internal_error', message: err.message });
  }
}
