const Cart = require('../models/Cart');
const Hotel = require('../models/Hotel');
const Destination = require('../models/Destination');

// Add item to cart (hotel or destination)
exports.addToCart = async (req, res) => {
  try {
    const { itemId, itemType, quantity } = req.body; // itemType: 'hotel' or 'destination'

    let item;
    if (itemType === 'hotel') {
      item = await Hotel.findById(itemId);
    } else if (itemType === 'destination') {
      item = await Destination.findById(itemId);
    }

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if item already in the cart
    const existingCartItem = await Cart.findOne({
      user: req.user._id,
      itemId,
      itemType,
    });

    if (existingCartItem) {
      // Update the quantity if already in the cart
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json({ message: 'Item quantity updated', data: existingCartItem });
    }

    const newCartItem = new Cart({
      user: req.user._id,
      itemId,
      itemType,
      quantity,
    });

    await newCartItem.save();
    res.status(201).json({ message: 'Item added to cart', data: newCartItem });

  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all items in cart
exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user._id }).populate('itemId');
    res.status(200).json({
      success: true,
      data: cartItems,
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await Cart.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    res.status(200).json({ message: 'Item removed from cart' });

  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: error.message });
  }
};
