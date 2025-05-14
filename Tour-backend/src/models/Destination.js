const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a destination name'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  image: {
    type: String,
    required: [true, 'Please add an image']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  category: {
    type: String,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: [true, 'Please add a hotel']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Destination', DestinationSchema);
