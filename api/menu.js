// GET /api/menu
// Public menu listing. Optional query: ?category=...&isAvailable=true
// Calls the Supabase REST API directly — no npm dependency required.
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'GET') {
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

  const { category, isAvailable } = req.query || {};

  let url = `${supabaseUrl}/rest/v1/menu_items?select=*&order=created_at.desc`;
  if (category) url += `&category=eq.${encodeURIComponent(category)}`;
  if (isAvailable !== undefined) url += `&is_available=eq.${isAvailable === 'true'}`;

  try {
    const response = await fetch(url, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).json({ error: 'supabase_error', message: text });
      return;
    }

    const data = await response.json();
    res.status(200).json(data || []);
  } catch (err) {
    res.status(500).json({ error: 'internal_error', message: err.message });
  }
}
