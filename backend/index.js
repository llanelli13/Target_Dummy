const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Import Routes
const weaponRoutes = require('./routes/weaponRoutes');
const userRoutes = require('./routes/userRoutes');
const shotSequenceRoutes = require('./routes/shotSequenceRoutes');

// Use Routes
app.use('/api/weapons', weaponRoutes);
// app.use('/api/weapons', (req, res) => {
//     res.status(200).json({ message: 'Test route working!' });
// });

app.use('/api/users', userRoutes);
app.use('/api/shotSequences', shotSequenceRoutes);

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
