require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { supabase } = require('./config/supabase');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Verify Supabase connection on startup
supabase
  .from('menu_items')
  .select('id')
  .limit(1)
  .then(() => console.log('Supabase connected'))
  .catch((err) => {
    console.error('Supabase connection failed:', err.message);
    process.exit(1);
  });

const app = express();

// Security & parsing middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/api/health', async (req, res) => {
  const { error } = await supabase.from('menu_items').select('id').limit(1);
  res.json({
    status: error ? 'degraded' : 'ok',
    service: 'dum-backend',
    database: error ? 'disconnected' : 'connected',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err.message);
  server.close(() => process.exit(1));
});

module.exports = app;
