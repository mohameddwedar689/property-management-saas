const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const landlordRoutes = require('./routes/landloardRoutes');
const tenantRoutes = require('./routes/tenantRoutes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/landloard', landlordRoutes);
app.use('/api/tenant', tenantRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
