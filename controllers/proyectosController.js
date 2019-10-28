const Proyecto = require('../models/Proyecto');
const slug = require('slug');

exports.proyectosHome = async (req, res) => {
  res.render('index',{
    nombrePagina: 'Proyectos',
  });
}

exports.formularioProyecto = (req, res) => {
  res.render('nuevoProyecto', {
    nombrePagina: 'Nuevos proyectos'
  });
}

exports.nuevoProyecto = async (req, res) => {
  // console.log(req.body);
  const { nombre } = req.body;

  let errores = [];

  if (!nombre) {
    errores.push({texto: 'Agregar un Nombre al Proyecto'});
  }

  // si hay errores
  if (errores.length > 0) {
    res.render('nuevoProyecto', {
      nombrePagina: 'Nuevo Proyecto',
      errores,
    })
  }

  // Proyecto.create({nombre})
  //   .then(() => console.log('Se guardo el proyecto correctamente'))
  //   .catch(err => console.log('Error al guardar proyecto: ', err))

  // url amigable
  // const url = slug(nombre).toLowerCase();

  // usando async await
  const proyecto = await Proyecto.create({nombre});
  res.redirect('/');
}

exports.proyectosPorUrl = async (req, res) => {
  const { url } = req.params;

  const proyecto = await Proyecto.findOne({
    where: {
      url,
    }
  });

  res.render('tareas', {
    nombrePagina: 'Tareas del Proyecto',
    proyecto
  });
}