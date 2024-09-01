require('dotenv').config(); // load env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studyPlanRoutes = require('./routes/studyPlanRoutes');

const app = express();
const mongoURI = process.env.MONGODB_URI; // mongo
const port = process.env.PORT || 5000; 

// Middleware
app.use(express.json()); 
app.use(cors()); 

// mongo
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  
app.use('/api/auth', authRoutes);          // Auth routes
app.use('/api/calendar', calendarRoutes);   // Calendar routes
app.use('/api/courses', courseRoutes);      // Course routes
app.use('/api/study-plans', studyPlanRoutes); // Study plan routes

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
    console.error(err); // log
    res.status(500).json({ message: err.message });
  });
