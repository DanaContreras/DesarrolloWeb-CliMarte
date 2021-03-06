//Requires utilizados. 
const express = require('express');
const ruta = express.Router();
const path = require('path');
const {verificarLimitesIndice, verificarSolKey} = require('../js/validaciones');
const fs = require('fs');

//get principal de la ruta, se pasan parametros a través del query, y devuelve los climas de los soles desde el from como índice hasta la cantidad requerida.
ruta.get('/', (req, res) => {

    //Parametros, guardados como enteros para usarlos matemáticamente
    let {cantidad, from} = req.query;
    cantidad = parseInt(cantidad);
    from = parseInt(from);

    //Recupera el json de los climas y guarda su arreglo y la longitud del mismo para acceder más fácil y claramente adelante.
    const climasString = fs.readFileSync(path.join(__dirname + '/../json/climas.json'), 'utf-8');
    const climasJson = JSON.parse(climasString);
    const arregloSoles = climasJson["sol_keys"];
    const largoArreglo = arregloSoles.length;

    //Verifica si los parametros son correctos
    if(verificarLimitesIndice(largoArreglo, cantidad, from)){

        //Objeto donde se guardará la respuesta.
        const respuesta = {
            //arreglo donde se guardan todas las keys o ids de los soles
            "sol_keys": [],
            //atributo que nos marca cuantos soles restantes hay despues del último requerido.
            "restantes": largoArreglo - (cantidad + from)
        };
    
        //For en el cual se agregan todos los climas pedidos a la respuesta. keyActual sirve para hacer más claro el codigo.
        let keyActual;
        for(var i = 0; i < cantidad; i++){
            keyActual = arregloSoles[largoArreglo - from - i - 1]
            respuesta[keyActual] = climasJson[keyActual];
            respuesta["sol_keys"][cantidad - i - 1] = keyActual;
        }
        
        //Si todo fue bien, devuelve la respuesta con un 200.
        res.status(200).json(respuesta);
    } else {
        //Si la verificación falla, notifica fallo de parametros con un 400.
        res.status(400).send('Error: Datos ingresados incorrectos');
    }
})

//Get para poder ver de manera rapido el arreglo con todas las sol_keys
ruta.get('/LlavesClimas', (req, res) => {

    const climasString = fs.readFileSync(path.join(__dirname + '/../json/climas.json'), 'utf-8');
    const climasJson = JSON.parse(climasString);

    res.status(200).send(climasJson["sol_keys"]);
})

//Get que permite ver la información del clima de un Sol especifico, buscandolo por su sol_key o id
ruta.get('/:id', (req, res) => {

    const id = req.params.id;
    const climasString = fs.readFileSync(path.join(__dirname + '/../json/climas.json'), 'utf-8');
    const climasJson = JSON.parse(climasString);

    const arregloSoles = climasJson["sol_keys"];

    if(verificarSolKey(arregloSoles, id)){
        res.status(200).send(climasJson[id]);
    } else {
        res.status(400).send('Error: ID ingresada no válida.');
    }
})

module.exports = ruta;