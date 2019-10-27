const express = require('express');
const routes = require('./routes');

// crear una app de express
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// ruta para el home
app.use('/', routes());

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});