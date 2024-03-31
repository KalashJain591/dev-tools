const Sequelize = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.PG_DB,
    process.env.PG_USER,
    "postgres",
    {
        host: process.env.PG_HOST,
        dialect: 'postgres',
    }
);

module.exports = sequelize;