const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  // 'employee_db',
  process.env.DB_NAME,
  // 'root',
  process.env.DB_USER,
  // 'password',
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = sequelize;
