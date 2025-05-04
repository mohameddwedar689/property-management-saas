const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { 
    addProperty, 
    getProperties,
    addTenant,
    getTenants,
    recordRentPayment,
    getRentSummary,
} = require('../controllers/landloardController');

// routes for landlord (Add new property, get all properties)
router.post('/properties/add', authenticate, authorize('landlord'), addProperty);
router.get('/properties', authenticate, authorize('landlord'), getProperties);

// routes for landlord (Add tenant, get all tenants)
router.post('/tenants/add', authenticate, authorize('landlord'), addTenant);
router.get('/tenants', authenticate, authorize('landlord'), getTenants);

// routes for landlord (Add record rent payment, get rent summary)
router.post('/rent-payments', authenticate, authorize('landlord'), recordRentPayment);
router.get('/rent-summary', authenticate, authorize('landlord'), getRentSummary);


module.exports = router;

