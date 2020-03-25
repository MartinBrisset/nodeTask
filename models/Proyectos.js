const Sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');

const Proyectos = db.define('proyectos', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    nombre :  Sequelize.STRING(100),
    url : Sequelize.STRING(100)
}, {
    hooks: {
        beforeCreate(proyecto) {// los hooks son como middlewares
            const url = slug(proyecto.nombre).toLowerCase();// la libreria slug limpia un nombre, lo paso como url
            proyecto.url = `${url}-${shortid.generate()}` //le concateno un shorid al slug para que sea una url unica
        }
    }
});

module.exports = Proyectos;