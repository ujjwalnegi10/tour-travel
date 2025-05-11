const Wishlist = require('../models/Wishlist');

// Add hotel or destination to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { itemId, itemType } = req.body; // itemType: 'hotel' or 'destination'

    const wishlistItem = new Wishlist({
      user: req.user._id, // coming from protect middleware
      itemId,
      itemType,
    });

    await wishlistItem.save();

    res.status(201).json({
      success: true,
      message: 'Added to wishlist',
      data: wishlistItem,
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all wishlist items for user
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      count: wishlist.length,
      data: wishlist,
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: error.message });
  }
};

// Remove item from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Wishlist.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Removed from wishlist',
    });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: error.message });
  }
};
