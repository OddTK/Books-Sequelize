const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    // First param: new of database we want to connect to
    process.env.DB_NAME,
    // Second param: which user we want to connect as
    process.env.DB_USER,
    // Third param: what is the password of the user we want to connect as
    process.env.DB_PASSWORD,
    // Fourth param: Configuration object for the database we want to connect to
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
    }
);

module.exports = sequelize;
