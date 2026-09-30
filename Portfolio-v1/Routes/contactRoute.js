const express = require('express');
const { sendMessage } = require('../Controller/contactController');

const router = express.Router();

// POST /api/contact
router.post('/', sendMessage);

module.exports = router;
