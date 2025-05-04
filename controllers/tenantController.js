const { rentPayments } = require('../models/data');

// get all rent payments for a tenant
const getMyRent = (req, res) => {
    if (req.user.role !== 'tenant') {
        return res.status(403).json({ message: 'Access denied: only tenants can access this' });
    }

    const myPayments = rentPayments.filter(p => p.tenantId === req.user.id);

    res.json({
        payments: myPayments,
    });
};

module.exports = {
    getMyRent,
};