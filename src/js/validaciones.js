const moment = require('moment');

const verificarFormatoFecha = function(fecha) {
    // Verifica que el formato sea valido y se encuentre entre [1995-06-16, hoy].

    let esValido = moment(fecha, 'YYYY-MM-DD',true).isValid();

    if (esValido){
        const fechaMax = moment();
        const fechaMin = '1995-06-16';
        
        esValido = moment(fecha).isBetween(fechaMin, fechaMax);
    }
    
    return esValido;
};

const verificarRangoFechas = function(fechaInicio, fechaFin){
    // Verifica si el rango es valido.
    return (moment(fechaInicio) < moment(fechaFin));
}

const verificarLimitesIndice = function(largo, cantidad, desde){
    //Verifica que el desde no sea menor al límite inferior del índice, que la cantidad sea positiva y que la suma de ambos no se pase del límite superior del índice.
    return desde >= 0 && cantidad > 0 && (cantidad + desde) <= largo;
}

const verificarSolKey = function(solKeys, solKey){
    //Verifica que el key o id requerido se encuentre en entro los posibles.
    return solKeys.includes(solKey);
}

module.exports = {
    verificarFormatoFecha,
    verificarRangoFechas,
    verificarLimitesIndice, 
    verificarSolKey
};