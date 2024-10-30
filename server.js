const express = require('express');
const app = express();

const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

// Melayani file statis dari direktori img
app.use('/img', express.static(path.join(__dirname, 'img')));

// MongoDB connection
// ===============================================================================================

const userRoutes = require('./routes/user_routes');
app.use('/user', userRoutes);

const mejaRoutes = require('./routes/meja_routes');
app.use('/meja', mejaRoutes);

const menuRoutes = require('./routes/menu_routes');
app.use('/menu', menuRoutes);

const authRoutes = require('./routes/auth_routes');
app.use('/auth', authRoutes);

const transaksiRoutes = require('./routes/transaksi_routes');
app.use('/transaksi', transaksiRoutes);

const detailmenuRoutes = require('./routes/detailmenu_routes');
app.use('/detailmenu', detailmenuRoutes);

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