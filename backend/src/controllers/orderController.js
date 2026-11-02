const asyncHandler = require('express-async-handler');
const { supabase } = require('../config/supabase');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { items, totalAmount, deliveryAddress, paymentStatus } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // 1. Insert order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([
      {
        user_id: req.user.id,
        total_amount: totalAmount,
        delivery_address: deliveryAddress || {},
        payment_status: paymentStatus || 'pending',
        status: 'pending',
      },
    ])
    .select()
    .single();

  if (orderError || !order) {
    res.status(400);
    throw new Error(orderError?.message || 'Failed to create order');
  }

  // 2. Insert order items
  const orderItems = items.map((item) => ({
    order_id: order.id,
    menu_item_id: item.menuItemId,
    name: item.name,
    price: item.price,
    quantity: item.quantity || 1,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

  if (itemsError) {
    // Rollback: delete the order if items failed
    await supabase.from('orders').delete().eq('id', order.id);
    res.status(400);
    throw new Error(itemsError.message || 'Failed to create order items');
  }

  // 3. Fetch the full order with items
  const { data: fullOrder, error: fetchError } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id,
        name,
        price,
        quantity,
        created_at
      )
    `)
    .eq('id', order.id)
    .single();

  if (fetchError) throw fetchError;

  res.status(201).json(fullOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id,
        menu_item_id,
        name,
        price,
        quantity,
        created_at
      )
    `)
    .eq('id', req.params.id)
    .single();

  if (error || !data) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Ensure the user owns this order (unless admin)
  if (req.user.role !== 'admin' && data.user_id !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to view this order');
  }

  res.json(data);
});

// @desc    Get logged-in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id,
        name,
        price,
        quantity,
        created_at
      )
    `)
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;

  res.json(data || []);
});

// @desc    Get all orders (admin only)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id,
        name,
        price,
        quantity,
        created_at
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  res.json(data || []);
});

// @desc    Update order status (admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', req.params.id)
    .select()
    .single();

  if (error || !data) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.json(data);
});

// @desc    Update order payment status (admin only)
// @route   PUT /api/orders/:id/pay
// @access  Private/Admin
const updateOrderPayment = asyncHandler(async (req, res) => {
  const { paymentStatus } = req.body;

  const { data, error } = await supabase
    .from('orders')
    .update({ payment_status: paymentStatus })
    .eq('id', req.params.id)
    .select()
    .single();

  if (error || !data) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.json(data);
});

module.exports = {
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  updateOrderPayment,
};
