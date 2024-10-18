const express = require('express');
const app = express();

const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

// MongoDB connection

// ===============================================================================================

const userRoutes = require('./routes/user_routes');
app.use('/user', userRoutes);

const authRoutes = require('./routes/auth_routes');
app.use('/auth', authRoutes);


app.get('/', (req, res) => {
    res.send('App API is running');
});

// ===============================================================================================

const port = process.env.PORT || 5000;

mongoose.
    connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => console.error('MongoDB connection error:', err));

