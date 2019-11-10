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

exports.formularioEditar = async (req, res) => {
  const { url } = req.params;

  // para multibles peticiones asincronas no dependientes una de otra
  // la manera mal hecha es:
  // const proyectos = await Proyecto.findAll();
  // const proyecto = await Proyecto.findOne({
  //   where: {
  //     url,
  //   }
  // });

  // la manera correcta es ;
  const proyectosPromise = Proyecto.findAll();
  const proyectoPromise = Proyecto.findOne({
    where: {
      url,
    }
  });

  const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

  // const proyecto = await Proyecto.findOne({
  //   where: {
  //     url,
  //   }
  // });

  res.render('nuevoProyecto', {
    nombrePagina: 'Editar Proyecto',
    proyectos,
    proyecto
  });
}