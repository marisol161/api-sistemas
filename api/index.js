const express = require('express');
const routerApi = require('./routes');
// Importamos la libreria
const cors = require('cors');

// Se importan los middlewares
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;
const IP = '127.0.0.1'

//indicamos que use el middleware
app.use(express.json());

// Creamos un array
// Indica que estos son los rigenes de los cuales si quiero recibir peticiones
const whitelist = ['http://localhost:8080', 'https://myapp.com'];
const options = {
  // Acceso permitido
  origin: (prigin, callback) => {
    if(whitelist.includes(origin)){
      callback(null, true);
    }else{
      // Acceso no permitido
      callback(new Error('no permitido'));
    }
  }
}
// Indicamos que queremos usarla
// Aqui esta indicando quq quiere habilitar cualquier origen
app.use(cors());

app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

// Indicamos que use los middlewares
// Es importante el orden en el que se esten ejecutando
// Asi como se esten colocando sera el orden el que se ejecutaran
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Servidor corriendo en http://'+IP+':'+ port+'/api/v1');
});
