const express = require('express');
const app = express();
const workoutRoutes = require('./routes/workout');
const authRoutes = require('./routes/auth');

app.use('/', authRoutes);
app.use('/', workoutRoutes);

module.exports = app;
