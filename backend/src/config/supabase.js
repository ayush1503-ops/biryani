const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isPlaceholder = (val) => !val || val.includes('PASTE_YOUR') || val.includes('your_') || val.includes('PLACEHOLDER');

if (!supabaseUrl || isPlaceholder(supabaseUrl)) {
  console.warn('Supabase URL not configured — API routes needing Supabase will return 503.');
}
if (!supabaseServiceRoleKey || isPlaceholder(supabaseServiceRoleKey)) {
  console.warn('Supabase service role key not configured — API routes needing Supabase will return 503.');
}

// Service-role client: bypasses RLS, used by the Express server for all writes
// and trusted reads. Never expose this key to the browser.
let supabase = null;
if (supabaseUrl && supabaseServiceRoleKey && !isPlaceholder(supabaseUrl) && !isPlaceholder(supabaseServiceRoleKey)) {
  supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

module.exports = { supabase };
