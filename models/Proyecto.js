const Sequelize = require('sequelize');
const slug = require('slug');
const shorid = require('shortid');
const db = require('../config/db');

const Proyecto = db.define('proyectos', {
  id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true,
    autoIncrement: true 
  },
  nombre: Sequelize.STRING,
  url: Sequelize.STRING,
}, {
  hooks: {
    beforeCreate(proyecto) {
      console.log('antes de insertar en la BD');
      const url = slug(proyecto.nombre).toLowerCase();
      proyecto.url =`${url}-${shorid.generate()}`;
    }
  }
})

module.exports = Proyecto;