const express = require('express');
const {
    getStatus,
    getFlower,
} = require('../controllers/flowerControllers');

const router = express.Router();

router.get('/status', getStatus);

router.get('/flower', getFlower);

module.exports = router;