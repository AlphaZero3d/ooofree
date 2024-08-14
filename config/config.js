const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite')
});

module.exports = { sequelize };
