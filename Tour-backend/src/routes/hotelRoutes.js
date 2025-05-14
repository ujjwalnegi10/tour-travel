const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');

const {
  createHotel,
  getHotels,
  getHotelById,
} = require('../controllers/hotelController');

// GET all hotels
router.get('/', getHotels);

// GET hotel by ID
router.get('/:id', getHotelById);

// POST create new hotel (with image upload)
router.post('/create', upload.single('image'), createHotel);

module.exports = router;
