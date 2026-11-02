const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL is not defined in .env');
}
if (!supabaseServiceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined in .env');
}

// Service-role client: bypasses RLS, used by the Express server for all writes
// and trusted reads. Never expose this key to the browser.
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

module.exports = { supabase };
