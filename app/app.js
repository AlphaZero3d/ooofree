const express = require('express');
const router = express.Router();
const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workout');

// Use authentication routes
router.use('/', authRoutes);

// Use workout-related routes
router.use('/', workoutRoutes);

module.exports = router;
