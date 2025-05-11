const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  location: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Destination', destinationSchema);
