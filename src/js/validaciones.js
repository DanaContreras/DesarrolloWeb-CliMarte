const verificarFormatoFecha = function (fecha) {
    // Verifica que el formato sea valido. 'YYYY/MM/DD'

    let verificacion = false;
    let formato = /^(\d{4})[-](\d{2})[-](\d{2})$/.exec(fecha);

    // La longitud de la fecha debe tener exactamente 10 caracteres y el formato especificado
    if (fecha.length === 10 && formato !== null){

        let parte = fecha.split("-");
        let anio = parseInt(parte[0]);
        let mes = parseInt(parte[1]);
        let dia = parseInt(parte[2]);

        // Verifica que dia, mes, año, solo sean numeros
        verificacion = !((isNaN(dia) || isNaN(mes) || isNaN(anio)));
     
        if (verificacion){

            let fechaMax = new Date();
            let zonaHoraria = fechaMax.getTimezoneOffset() * 60000;
            fechaMax = new Date(fechaMax.getTime() - zonaHoraria);

            let fechaConFormato = new Date(anio, mes-1, dia);

            let fechaMin = new Date ("06-16-1995");

            // Verifica que la fecha sea mayor o igual a 16/06/1995 y menor o igual a la fecha actual.
            if (fechaConFormato < fechaMin || fechaConFormato > fechaMax )
                verificacion = false;
        }
 
    }

    return verificacion;
};

const transformarAFormatoFecha = function(fecha){
    // Transforma un string en formato Date.
    let parte = fecha.split("-");
    let anio = parseInt(parte[0]);
    let mes = parseInt(parte[1]);
    let dia = parseInt(parte[2]);

    return (new Date(anio, mes-1, dia));
}

const verificarRangoFechas = function(fechaInicio, fechaFin){
    // Verifica si el rango es valido.
    let fechaI = transformarAFormatoFecha(fechaInicio);
    let fechaF = transformarAFormatoFecha(fechaFin);
    return (fechaI < fechaF);
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