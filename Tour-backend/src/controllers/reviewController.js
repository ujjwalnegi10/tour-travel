const Review = require('../models/Review');
const Hotel = require('../models/Hotel');
const Destination = require('../models/Destination');

// Add review for hotel or destination
exports.addReview = async (req, res) => {
  try {
    const { rating, comment, itemId, itemType } = req.body;

    let item;
    if (itemType === 'hotel') {
      item = await Hotel.findById(itemId);
    } else if (itemType === 'destination') {
      item = await Destination.findById(itemId);
    }

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const newReview = new Review({
      user: req.user._id,
      itemId,
      itemType,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: newReview,
    });

  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get reviews for a specific item (hotel or destination)
exports.getReviews = async (req, res) => {
  try {
    const { itemId, itemType } = req.params;

    let reviews;
    if (itemType === 'hotel') {
      reviews = await Review.find({ itemId, itemType: 'hotel' }).populate('user');
    } else if (itemType === 'destination') {
      reviews = await Review.find({ itemId, itemType: 'destination' }).populate('user');
    }

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: error.message });
  }
};
