const express = require('express');
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  updateOrderPayment,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, admin, getOrders);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, admin, updateOrderStatus);
router.put('/:id/pay', protect, admin, updateOrderPayment);

module.exports = router;
