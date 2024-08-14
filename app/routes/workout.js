const express = require('express');
const Workout = require('../models/workout');
const router = express.Router();

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Get all workouts
router.get('/', isAuthenticated, async (req, res) => {
    const workouts = await Workout.findAll({ where: { userId: req.user.id } });
    res.render('index', { workouts });
});

// Add a new workout
router.get('/add_workout', isAuthenticated, (req, res) => {
    res.render('add_workout');
});

router.post('/add_workout', isAuthenticated, async (req, res) => {
    const { date, exercise, sets, reps, weight } = req.body;
    await Workout.create({ date, exercise, sets, reps, weight, userId: req.user.id });
    res.redirect('/');
});

// View workouts
router.get('/view_workouts', isAuthenticated, async (req, res) => {
    const workouts = await Workout.findAll({ where: { userId: req.user.id } });
    res.render('view_workouts', { workouts });
});

module.exports = router;
