const fetch = require('node-fetch');
const config = require('./config');

const getImagenDelDia = async (fecha) => {
    // Se obtiene la imagen correspondiente a la fecha pasada por parametro.

    try {
        const respuesta = await fetch('https://api.nasa.gov/planetary/apod?api_key=' + config.key + '&date=' + fecha + '&');
        let imagen = await respuesta.json();
    } catch (error) {
        throw error;
    }

    return imagen;
}

const getImagenesRangoFechas = async (fechaInicio, fechaFin) => {
    // Se obtiene las imagenes dentro del rango de fechas. 
    try {
        const respuesta = await fetch('https://api.nasa.gov/planetary/apod?api_key=' + config.key + '&start_date=' + fechaInicio + '&end_date=' + fechaFin);
        let imagenes = await respuesta.json();

    } catch (error) {
        throw error;
    }
    
    return imagenes;
}

module.exports = {
    getImagenDelDia,
    getImagenesRangoFechas
};