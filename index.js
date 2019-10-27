const express = require('express');

// crear una app de express
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// ruta para el home
app.use('/', (req, res) => {
  res.send('Hola mundo')
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});