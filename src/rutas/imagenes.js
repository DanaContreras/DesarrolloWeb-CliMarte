const express = require('express');
const ruta = express.Router();
const validaciones = require('../js/validaciones');
const apiAPOD = require('../js/apiAPOD');
const archivo = require('../js/manipulacionArchivo');

// Get que permite ver la información de una imagen especifica, buscandola por su id = fecha.
ruta.get('/:fecha', async (req, res) => {

    const fecha = req.params.fecha;

    if (validaciones.verificarFormatoFecha(fecha)) {
        let imagen;
        let vacio = true;
        try {
            // Se controla que el archivo json no se encuentre vacio.
            vacio = archivo.estaVacio();

            if (!vacio) {
                imagen = archivo.getImagen(fecha);

                // El archivo json no tiene la imagen, se la busca directamente en la Api.
                if (imagen == null)
                    imagen = await apiAPOD.getImagenDelDia(fecha);

            }
            else
                imagen = await apiAPOD.getImagenDelDia(fecha);

            res.json(imagen);

        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor.' })
        }

        // Se verifica que el archivo siempre cuente con las ultimas 15 imagenes actuales.
        if (vacio || !archivo.verificarArchivoActualizado())
            archivo.actualizarArchivo();

    } else
        res.status(400).json({ error: 'La fecha ingresada no tiene el formato correcto.' })

})

// Get principal de la ruta, se pasan parametros a través del query, y devuelve las imagenes contenidas en un rango.
ruta.get('/', async (req, res) => {

    const {fechaInicio, fechaFin} = req.query;

    // Se verifica que las fechas tenga el formato YYYY-MM-DD y fechaInicio < fechaFin.
    const verificacion = validaciones.verificarFormatoFecha(fechaInicio) && validaciones.verificarFormatoFecha(fechaFin) && validaciones.verificarRangoFechas(fechaInicio, fechaFin);
    
    if (verificacion) {
        let vacio = true;
        let imagenRango;
        try {
            // Se controla que el archivo json no se encuentre vacio.
            vacio = archivo.estaVacio();

            // Se busca el rango localmente.
            if (!vacio) {
                imagenRango = archivo.getImagenesRangoFechas(fechaInicio, fechaFin);

                // El archivo json no lo tiene, se lo busca directamente en la Api.
                if (imagenRango.length === 0)
                    imagenRango = await apiAPOD.getImagenesRangoFechas(fechaInicio, fechaFin);
            }
            else
                imagenRango = await apiAPOD.getImagenesRangoFechas(fechaInicio, fechaFin);

            res.json(imagenRango);

        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor.' })
        }
        
        // Se verifica que el archivo siempre cuente con las ultimas 15 imagenes actuales.
        if (vacio || !archivo.verificarArchivoActualizado())
            archivo.actualizarArchivo();

    } else {
        res.status(400).json({ error: 'Las fechas ingresadas no tienen el formato correcto.' })
    }
})

module.exports = ruta;
