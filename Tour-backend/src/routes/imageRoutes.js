const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const router = express.Router();
const fs = require('fs');

// Multer config (temporary uploads folder)
const upload = multer({ dest: 'uploads/' });

// Upload multiple images to Cloudinary
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const imageUrls = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'my-images',
      });

      // Cleanup temp file
      fs.unlinkSync(file.path);

      imageUrls.push(result.secure_url);
    }

    res.status(200).json({
      message: 'Images uploaded successfully!',
      imageUrls,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

module.exports = router;
