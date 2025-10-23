require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

//database connection
connectDB();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/users', userRoutes);
app.use('/api/auth',authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));