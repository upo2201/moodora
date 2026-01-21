const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
let isDbConnected = false;
mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('MongoDB Connected (Old Money Style) 🏛️');
    isDbConnected = true;
  })
  .catch(err => {
    console.log('⚠️ MongoDB Connection Failed. Switching to In-Memory Fallback Mode.');
    console.error('Error:', err.message);
    isDbConnected = false;
  });

// Make DB Status available to Routes
app.use((req, res, next) => {
  req.isDbConnected = isDbConnected;
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/moods', require('./routes/moods'));

app.get('/', (req, res) => {
  res.send(`Moodora Backend Running. DB Status: ${isDbConnected ? 'Connected' : 'In-Memory (Fallback)'}`);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
