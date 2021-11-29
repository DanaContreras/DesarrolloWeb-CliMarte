
let verificarFormatoFecha = function (fecha) {
    // Verifica que el formato sea valido. 'YY/MM/DD'

    let verificacion = false;
    let formato = /^(\d{4})[-](\d{1,2})[-](\d{1,2})$/.exec(fecha);

    // La longitud de la fecha debe tener exactamente 10 caracteres y el formato especificado
    if (fecha.length === 10 && formato !== null){

        let parte = fecha.split("-");
        var anio = parseInt(parte[0]);
        var mes = parseInt(parte[1]);
        var dia = parseInt(parte[2]);

        // Verifica que dia, mes, año, solo sean numeros
        verificacion = !(isNaN(dia) || isNaN(mes) || isNaN(anio));

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

module.exports = {
    verificarFormatoFecha
};