const fetch = require('node-fetch');
const config = require('./config');

const getImagenDelDia = async (fecha) => {
    // Se obtiene la imagen correspondiente a la fecha pasada por parametro.
    let imagen = null;
    const respuesta = await fetch('https://api.nasa.gov/planetary/apod?api_key=' + config.key + '&date=' + fecha + '&');
    imagen = await respuesta.json();
    return imagen;
}

module.exports = {
    getImagenDelDia
};