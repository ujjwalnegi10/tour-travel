const express = require('express');
const { createDestination, getDestinations } = require('../controllers/destinationController');
const router = express.Router();

router.post('/', createDestination);
router.get('/', getDestinations);

module.exports = router;
