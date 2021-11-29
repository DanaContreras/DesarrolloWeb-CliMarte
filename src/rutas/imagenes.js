
const express = require('express');
const ruta = express.Router();
const validaciones = require('../js/validaciones');
const apiAPOD = require('../js/apiAPOD');

ruta.get('/imagenes/:fecha', async(req, res) => {
    
    const fecha = req.params.fecha;
    if (validaciones.verificarFormatoFecha(fecha)){

        let imagenDelDia = await apiAPOD.getImagenDelDia(fecha);
        if (imagenDelDia !== null){
            res.json(imagenDelDia);
        } else{
            res.status(500).json({ error: 'La imagen no se encuentra disponible.' })
        }

    }else{
        res.status(500).json({ error: 'La fecha ingresada no tiene el formato correcto.' })
    }

})

module.exports = ruta;
