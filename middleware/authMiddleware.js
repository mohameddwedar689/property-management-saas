const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({ message: 'Missing or invalid token' });

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, role }
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

// Optional middleware to check role
const authorize = (role) => (req, res, next) => {
    if (req.user.role !== role)
        return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });

    next();
};

module.exports = { authenticate, authorize };
