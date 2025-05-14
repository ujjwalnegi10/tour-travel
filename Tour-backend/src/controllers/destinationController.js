const Destination = require('../models/Destination');
const cloudinary = require('../config/cloudinary');

exports.createDestination = async (req, res) => {
  try {
    const { name, description, location, category, hotel } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'destinations',
    });

    const newDestination = new Destination({
      name,
      description,
      image: result.secure_url,
      location,
      category,
      hotel,
    });

    await newDestination.save();

    res.status(201).json({
      success: true,
      message: 'Destination created successfully',
      data: newDestination,
    });
  } catch (error) {
    console.error('Create Destination Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().populate('hotel');
    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (error) {
    console.error('Get Destinations Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id).populate('hotel');
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.status(200).json({ success: true, data: destination });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
