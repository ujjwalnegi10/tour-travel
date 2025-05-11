const Hotel = require('../models/Hotel');
const cloudinary = require('../config/cloudinary');

exports.createHotel = async (req, res) => {
  try {
    const { name, location, description, price } = req.body;

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'hotels', // Optional: to organize uploads
    });

    // Create new hotel
    const newHotel = new Hotel({
      name,
      location,
      description,
      price,
      image: uploadResult.secure_url, // Save Cloudinary URL
    });

    await newHotel.save();

    res.status(201).json({
      success: true,
      data: newHotel,
    });
  } catch (error) {
    console.error('Error creating hotel:', error);
    res.status(500).json({ message: error.message });
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
    console.error('Error getting hotels:', error);
    res.status(500).json({ message: error.message });
  }
};
