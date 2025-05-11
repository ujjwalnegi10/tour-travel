const Destination = require('../models/Destination');
const cloudinary = require('../config/cloudinary');

exports.createDestination = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Uploading image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'destinations',
    });

    const newDestination = new Destination({
      name,
      description,
      image: result.secure_url,
      price,
    });

    await newDestination.save();

    res.status(201).json({
      success: true,
      message: 'Destination created successfully',
      data: newDestination,
    });

  } catch (error) {
    console.error('Create Destination Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (error) {
    console.error('Get Destinations Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
