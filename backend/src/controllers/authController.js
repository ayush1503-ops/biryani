const asyncHandler = require('express-async-handler');
const { supabase } = require('../config/supabase');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: {
      name: name || '',
      phone: phone || '',
      role: 'customer',
    },
    email_confirm: true,
  });

  if (error) {
    if (error.message && error.message.includes('already registered')) {
      res.status(400);
      throw new Error('User already exists');
    }
    throw error;
  }

  res.status(201).json({
    user: {
      id: data.user.id,
      name: data.user.user_metadata?.name,
      email: data.user.email,
      role: data.user.user_metadata?.role || 'customer',
    },
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({
    user: {
      id: data.user.id,
      name: data.user.user_metadata?.name,
      email: data.user.email,
      role: data.user.user_metadata?.role || 'customer',
    },
    access_token: data.session.access_token,
    expires_at: data.session.expires_at,
  });
});

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
});

module.exports = { registerUser, loginUser, getUserProfile };
