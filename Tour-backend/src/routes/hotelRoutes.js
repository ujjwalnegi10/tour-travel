const express = require('express');
const { createHotel, getHotels } = require('../controllers/hotelController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

// Create a new hotel (Protected + Image Upload)
router.post('/create',upload.single('image'), createHotel);

// Get all hotels (Public)
router.get('/', getHotels);

module.exports = router;
