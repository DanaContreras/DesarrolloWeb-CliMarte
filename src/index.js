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

//Rutas
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/html/index.html'));
});

app.get('/historial', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/html/historial.html'));
});

app.use('/api', require('./rutas/imagenes'));
app.use('/api/datosClima', require('./rutas/clima'));

//comenzando servidor.
app.listen(app.get('port'), () => {
    console.log(`Servidor en puerto ${app.get('port')}`);
});
