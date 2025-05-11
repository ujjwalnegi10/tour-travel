const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    checkInDate: { type: Date },
    checkOutDate: { type: Date },
    numOfGuests: { type: Number },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
