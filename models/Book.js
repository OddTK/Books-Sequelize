const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

// Declares a class called book and inherits all the prototype methods that are in the model class from sequelize
class Book extends Model {}

// Create table using JS
Book.init(
    // By default sequelize creates the id column for us
    // Takes two object params
    // First declares columns for this table
    {
        title: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.STRING,
        },
        isbn: {
            type: DataTypes.STRING,
        },
        pages: {
            type: DataTypes.INTEGER,
        },
        edition: {
            type: DataTypes.INTEGER,
        },
        isPaperback: {
            type: DataTypes.BOOLEAN,
        }
    },
    // Second declares which database connection this table should be created in
    // by default sequelize will create 2 columns for our table - created_at and updated_at
    {
        sequelize,
        timestamps: false,
        modelName: 'book',
    }
);

module.exports = Book;
