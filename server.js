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
server.engine('hbs', require('express-handlebars')({ extname: 'hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'app', 'views', 'layouts') }));
server.set('view engine', 'hbs');

// Use the main app routes
server.use('/', app);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
