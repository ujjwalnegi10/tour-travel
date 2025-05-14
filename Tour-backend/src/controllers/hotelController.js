const Hotel = require('../models/Hotel');
const cloudinary = require('../config/cloudinary');

exports.createHotel = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'hotels',
    });

    const newHotel = new Hotel({
      name,
      description,
      price,
      image: result.secure_url,
    });

    await newHotel.save();

    res.status(201).json({
      success: true,
      message: 'Hotel created successfully',
      data: newHotel,
    });
  } catch (error) {
    console.error('Create Hotel Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    console.error('Get Hotels Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.status(200).json({ success: true, data: hotel });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
