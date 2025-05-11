const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');

exports.createBooking = async (req, res) => {
  const { hotelId, checkInDate, checkOutDate, numOfGuests } = req.body;

  try {
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    const newBooking = new Booking({
      user: req.user.id,
      hotel: hotelId,
      checkInDate,
      checkOutDate,
      numOfGuests,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' , newBooking});
  }
};
