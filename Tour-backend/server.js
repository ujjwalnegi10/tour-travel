const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(morgan('dev'));

// API Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/hotels', require('./src/routes/hotelRoutes'));
app.use('/api/destinations', require('./src/routes/destinationRoutes'));
app.use('/api/bookings', require('./src/routes/bookingRoutes'));
app.use('/api/payments', require('./src/routes/paymentRoutes'));
app.use('/api/wishlist', require('./src/routes/wishlistRoutes'));
app.use('/api/cart', require('./src/routes/cartRoutes'));
app.use('/api/reviews', require('./src/routes/reviewRoutes'));
app.use('/api/protected', require('./src/routes/protectedRoute'));
app.use('/api/images', require('./src/routes/imageRoutes')); // ✅ Only image upload route

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
