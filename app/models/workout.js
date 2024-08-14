const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/config');

const Workout = sequelize.define('Workout', {
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    exercise: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sets: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reps: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
});

module.exports = Workout;
