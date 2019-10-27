const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('uptasknode', 'root', 'mysql', {
  host: 'localhost',
  dialect: 'mysql', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  port: '3306',
  operatorsAliases: false,
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});