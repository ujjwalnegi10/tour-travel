// src/routes/protectedRoute.js
const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Example protected route
router.get('/protected', protect, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

module.exports = router;
