
const express = require('express');
const ruta = express.Router();
const validaciones = require('../js/validaciones');
const apiAPOD = require('../js/apiAPOD');

ruta.get('/imagenes/:fecha', async(req, res) => {
    
    const fecha = req.params.fecha;
    if (validaciones.verificarFormatoFecha(fecha)){

        let imagenDelDia = await apiAPOD.getImagenDelDia(fecha);
        res.json(imagenDelDia);
        
    }else{
        res.status(500).json({ error: 'La fecha ingresada no tiene el formato correcto.' })
    }

})

ruta.get('/imagenes', async(req, res) => {

    const {fechaInicio, fechaFin} = req.query;

    const verificacion = validaciones.verificarFormatoFecha(fechaInicio) && validaciones.verificarFormatoFecha(fechaFin) && validaciones.verificarRangoFechas(fechaInicio, fechaFin);
    if (verificacion){
        let imagenes = await apiAPOD.getImagenesRangoFechas(fechaInicio, fechaFin);
        res.json(imagenes);
    }else{
        res.status(500).json({ error: 'Las fechas ingresadas no tienen el formato correcto.' })
    }
})

module.exports = ruta;
