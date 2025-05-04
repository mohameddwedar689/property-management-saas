const { v4: uuidv4 } = require('uuid');


const users = [
    { 
        id: '1', 
        email: 'landlord@example.com', 
        password: '123456', 
        role: 'landlord' 
    },
    { 
        id: '2', 
        email: 'tenant@example.com', 
        password: '123456', 
        role: 'tenant' 
    },
];

const properties = [
    {
        id: uuidv4(),
        address: '123 Main St',
        landlordId: '1',
    },
    {
        id: uuidv4(),
        address: '123 Sacondary St',
        landlordId: '1',
    },
]

const tenants = [
    {
        id: uuidv4(),
        name: 'John Doe',
        email: 'john@example.com',
        propertyId: properties[0].id,
        landlordId: '1',
    },
];

const rentPayments = [
    {
        id: uuidv4(),
        tenantId: tenants[0].id,
        propertyId: tenants[0].propertyId,
        amount: 1000,
        status: 'paid',
        dueDate: '2024-12-01',
    },
];

module.exports = { 
    users,
    properties,
    tenants,
    rentPayments,
};