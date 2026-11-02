const { createClient } = require('@supabase/supabase-js');
const asyncHandler = require('express-async-handler');

// Anon-key client for verifying user JWTs (frontend sends Bearer token)
const supabaseAnon = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
);

/**
 * Verify the Supabase JWT in the Authorization header and attach req.user.
 * Header format: Authorization: Bearer <access_token>
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  const { data, error } = await supabaseAnon.auth.getUser(token);

  if (error || !data.user) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }

  req.user = {
    id: data.user.id,
    email: data.user.email,
    name: data.user.user_metadata?.name,
    role: data.user.user_metadata?.role || 'customer',
  };

  next();
});

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }
};

module.exports = { protect, admin };
