
const express = require('express');
const connectDB = require('./src/config/db');  // MongoDB connection setup
const dotenv = require('dotenv');  // To manage environment variables
const cors = require('cors');  // CORS middleware for cross-origin requests
const morgan = require('morgan');  // HTTP request logger middleware

// routes
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const hotelRoutes = require('./src/routes/hotelRoutes');
const destinationRoutes = require('./src/routes/destinationRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const wishlistRoutes = require('./src/routes/wishlistRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const protectedRoutes = require('./src/routes/protectedRoute');

// Initialize environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the MongoDB database
connectDB();

// Middleware setup
app.use(express.json()); // To parse incoming JSON requests
app.use(
  cors({
    origin: 'http://localhost:5173', // For development: allows all origins including Ngrok
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies/auth headers
  })
);// Enable cross-origin requests
app.use(morgan('dev')); // Log HTTP requests in development mode

// API Routes
app.use('/api/auth', authRoutes); // Authentication routes (login, register)
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/hotels', hotelRoutes); // Hotel-related routes
app.use('/api/destinations', destinationRoutes); // Destination-related routes
app.use('/api/bookings', bookingRoutes); // Booking-related routes
app.use('/api/payments', paymentRoutes); // Payment-related routes
app.use('/api/wishlist', wishlistRoutes); // Wishlist-related routes
app.use('/api/cart', cartRoutes); // Cart-related routes
app.use('/api/reviews', reviewRoutes); // Review-related routes
app.use('/api/protected', protectedRoutes); // Protected route setup

// Error handling middleware (optional, for general error handling)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Set the port from environment variable or fallback to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
