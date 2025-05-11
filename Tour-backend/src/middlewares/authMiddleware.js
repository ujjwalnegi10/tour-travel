const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    // Remove "Bearer " from token if it's included
    const formattedToken = token.replace('Bearer ', '');

    const decoded = jwt.verify(formattedToken, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);  // Ensure decoded.userId is correct
    
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = { protect };
