// GET /api/menu/:id
// Public single menu item by id.
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
  const { id } = req.query || {};

  if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey.includes('your_')) {
    res.status(503).json({
      error: 'service_unavailable',
      message: 'Supabase not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY in Vercel project settings.',
    });
    return;
  }

  if (!id) {
    res.status(400).json({ error: 'missing_id' });
    return;
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/menu_items?select=*&id=eq.${encodeURIComponent(id)}`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).json({ error: 'supabase_error', message: text });
      return;
    }

    const data = await response.json();
    if (!data || data.length === 0) {
      res.status(404).json({ error: 'not_found', message: 'Menu item not found' });
      return;
    }

    res.status(200).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: 'internal_error', message: err.message });
  }
}
