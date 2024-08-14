const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const { sequelize } = require('./config/config');
const app = require('./app/app');

// Sync the database
sequelize.sync();

const server = express();

// Middleware setup
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));

// Session setup
server.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

// Passport setup
server.use(passport.initialize());
server.use(passport.session());

// Set up view engine
const { engine } = require('express-handlebars');
server.engine('hbs', engine({
    extname: 'hbs', 
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'app', 'views', 'layouts')
}));
server.set('view engine', 'hbs');
server.set('views', path.join(__dirname, 'app', 'views'));  // Path to your views

// Use the main app routes
server.use('/', app);

// Start the server
const PORT = process.env.PORT || 4444;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
