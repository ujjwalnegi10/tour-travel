const express = require('express');
const { addToWishlist, getWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, addToWishlist);
router.get('/', protect, getWishlist);

module.exports = router;
