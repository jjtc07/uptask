const express = require('express');
const routes = require('./routes');
const path = require('path')
const bodyParser = require('body-parser')

// helpers con algunas funciones
const helpers = require('./helpers')

// crear conexión a la BD
const db = require('./config/db');

// Importar el modelo
const Proyecto = require('./models/Proyecto');

db.sync()
      .then(() => console.log('Conectado al servidor de mysql'))
      .catch(err => console.log('error al conectar con mysql: ', err))

// crear una app de express 
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// Donde cargar los archivos estaticos
app.use(express.static('public'));

// habilitar pug
app.set('view engine', 'pug');

// Añadir la carpeta de las vistas
// app.set('views', path.join(__dirname, './views')); // es opcional o para settear la carpeta por default ya que sin esta linea funciona correctamente.

// Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

// pasar vardump a la aplicación
app.use(async (req, res, next) => {
  const proyectos = await Proyecto.findAll();
  res.locals.vardump = helpers.vardump;
  res.locals.proyectos = proyectos;

  next(); // continuar con el código siguiente(el siguiente middleware)
})

// ruta para el home
app.use('/', routes());

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});