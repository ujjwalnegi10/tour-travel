const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');

const {
  createDestination,
  getDestinations,
  getDestinationById,
} = require('../controllers/destinationController');

// GET all destinations
router.get('/', getDestinations);

// GET destination by ID
router.get('/:id', getDestinationById);

// POST create new destination (with image upload)
router.post('/create', upload.single('image'), createDestination);

module.exports = router;
