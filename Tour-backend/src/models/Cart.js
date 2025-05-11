const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  itemType: {
    type: String,
    enum: ['hotel', 'destination'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
