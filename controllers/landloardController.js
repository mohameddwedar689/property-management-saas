const { 
    properties,
    tenants, 
    rentPayments,
} = require('../models/data');
const { v4: uuidv4 } = require('uuid');

// Add a new property
const addProperty = (req, res) => {
    const { address } = req.body;
    if (!address) {
        return res.status(400).json({ message: 'Address is required' });
    }
    const newProperty = {
        id: uuidv4(),
        address,
        landlordId: req.user.id,
    };
    properties.push(newProperty);
    res.status(201).json({ message: 'Property added', property: newProperty });
}

// Get all properties for a landlord
const getProperties = (req, res) => {
    const landlordProperties = properties.filter(p => p.landlordId === req.user.id);
    res.json(landlordProperties);
}

// Add a tenant and assign to a property
const addTenant = (req, res) => {
    const { name, email, propertyId } = req.body;
    if (!name || !email || !propertyId) {
        return res.status(400).json({ message: 'Name, email, and propertyId are required' });
    }

    const property = properties.find(p => p.id === propertyId && p.landlordId === req.user.id);
    console.log("properties", properties);
    
    
    if (!property) {
        return res.status(404).json({ message: 'Property not found or not owned by landlord' });
    }
    const newTenant = {
        id: uuidv4(),
        name,
        email,
        propertyId,
        landlordId: req.user.id,
    };
    tenants.push(newTenant);
    res.status(201).json({ message: 'Tenant added successfully', tenant: newTenant });
};

// Get all tenants of the logged-in landlord
const getTenants = (req, res) => {
    const landlordTenants = tenants.filter(t => t.landlordId === req.user.id);
    res.json(landlordTenants);
};

// Record a rent payment for a tenant
const recordRentPayment = (req, res) => {
    const { tenantId, propertyId, amount, status, dueDate } = req.body;
    if (!tenantId || !propertyId || !amount || !status || !dueDate) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const tenant = tenants.find(t => t.id === tenantId && t.propertyId === propertyId && t.landlordId === req.user.id);
    const property = properties.find(p => p.id === propertyId && p.landlordId === req.user.id);
    if (!tenant || !property) {
        return res.status(404).json({ message: 'Tenant or property not found or unauthorized' });
    }
    const newPayment = {
        id: uuidv4(),
        tenantId,
        propertyId,
        amount,
        status,
        dueDate,
    };
    rentPayments.push(newPayment);
    res.status(201).json({ message: 'Rent payment recorded', payment: newPayment });
};

// Get rent summary for a landlord
const getRentSummary = (req, res) => {
    const landlordTenants = tenants.filter(t => t.landlordId === req.user.id);
    const tenantIds = landlordTenants.map(t => t.id);
    const landlordPayments = rentPayments.filter(p => tenantIds.includes(p.tenantId));
    const totalCollected = landlordPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + Number(p.amount), 0);
    const totalPending = landlordPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + Number(p.amount), 0);
    res.json({ totalCollected, totalPending });
};

module.exports = { 
    addProperty,
    getProperties,
    addTenant,
    getTenants,
    recordRentPayment,
    getRentSummary,
};