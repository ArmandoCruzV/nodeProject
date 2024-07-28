const express = require('express');
const cors = require('cors');
const app = express();
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

//sirve para recibir POST
app.use(express.json());
//Aqui controlas y colocas todas las direcciones a donde se puede mandar información
const whiteList = ['http://localhost:8080'];
const options = {
  origin: (origin,callback) => {
    if(whiteList.includes(origin)) {
      callback(null,true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));

const port = 3000;

app.get('/',(req, res)=>{
  res.send('HOLA MUNDO');
})

routerApi(app);
//los middlewares siempre deben ir despues del routerAppi
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port,()=>{
  console.log('port escuchando en: '+ port);
});
