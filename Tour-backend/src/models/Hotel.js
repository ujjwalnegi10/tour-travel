const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    image: { type: String },
  },
  { timestamps: true }
);

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
