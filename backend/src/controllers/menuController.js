const asyncHandler = require('express-async-handler');
const { supabase } = require('../config/supabase');

// @desc    Get all menu items (with optional category filter)
// @route   GET /api/menu
// @access  Public
const getMenuItems = asyncHandler(async (req, res) => {
  if (!supabase) {
    res.status(503);
    throw new Error('Supabase not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  }
  const { category, isAvailable } = req.query;

  let query = supabase.from('menu_items').select('*').order('created_at', { ascending: false });

  if (category) query = query.eq('category', category);
  if (isAvailable !== undefined) query = query.eq('is_available', isAvailable === 'true');

  const { data, error } = await query;

  if (error) throw error;

  res.json(data || []);
});

// @desc    Get single menu item by ID
// @route   GET /api/menu/:id
// @access  Public
const getMenuItemById = asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error || !data) {
    res.status(404);
    throw new Error('Menu item not found');
  }

  res.json(data);
});

// @desc    Create a menu item (admin only)
// @route   POST /api/menu
// @access  Private/Admin
const createMenuItem = asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('menu_items')
    .insert([req.body])
    .select()
    .single();

  if (error) throw error;

  res.status(201).json(data);
});

// @desc    Update a menu item (admin only)
// @route   PUT /api/menu/:id
// @access  Private/Admin
const updateMenuItem = asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('menu_items')
    .update(req.body)
    .eq('id', req.params.id)
    .select()
    .single();

  if (error || !data) {
    res.status(404);
    throw new Error('Menu item not found');
  }

  res.json(data);
});

// @desc    Delete a menu item (admin only)
// @route   DELETE /api/menu/:id
// @access  Private/Admin
const deleteMenuItem = asyncHandler(async (req, res) => {
  const { error } = await supabase.from('menu_items').delete().eq('id', req.params.id);

  if (error) throw error;

  res.json({ message: 'Menu item removed' });
});

module.exports = {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
