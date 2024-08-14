const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/config');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Hash password before saving the user
User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
