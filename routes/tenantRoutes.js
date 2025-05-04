const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { getMyRent } = require('../controllers/tenantController');

router.get('/my-rent', authenticate, getMyRent);

module.exports = router;