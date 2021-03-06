const { application } = require('express');
const Sequelize = require('sequelize');
//Connection with database
require('dotenv').config();
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
    });

module.exports = sequelize;

