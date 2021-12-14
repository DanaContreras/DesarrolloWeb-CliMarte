const express = require('express');
const app = express();
const path = require('path');

//Configuraciones
const puerto = process.env.PORT || 3000;
app.set('port', puerto); 
app.set('json spaces', 2);

//Middlewares
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());

//Usando para pruebas y checkeos
/*app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path : ', req.path);
    console.log('method: ', req.method);
    next();
})*/

//Rutas
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/html/index.html'));
});

app.get('/historial', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/html/historial.html'));
});

app.use('/api', require('./rutas/imagenes'));
app.use('/api/datosClima', require('./rutas/clima'));

//Agregar el siguiente use para cuando no existe tal página?
/*app.use((req, res) => {
    res.status(404).send('Error 404, página no encontrada.');
})*/

//comenzando servidor.
app.listen(app.get('port'), () => {
    console.log(`Servidor en puerto ${app.get('port')}`);
});
