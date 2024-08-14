const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');  // Assuming you have a User model in your models directory
const router = express.Router();

// Configure Passport.js to use the local strategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// Serialize user information into the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user information from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Route to render the login page
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });  // Passing a title variable to the view
});

// Route to handle login form submission
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true  // Ensure flash messages are enabled if using connect-flash
}));

// Route to render the registration page
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

// Route to handle registration form submission
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword });
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Error registering user');
    }
});

// Route to handle logout
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});

module.exports = router;
