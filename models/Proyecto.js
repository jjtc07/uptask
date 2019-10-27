const Sequelize = require('sequelize');
const db = require('../config/db');

const Proyecto = db.define('proyectos', {
  id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true,
    autoIncrement: true 
  },
  nombre: Sequelize.STRING,
  url: Sequelize.STRING,
})

module.exports = Proyecto;