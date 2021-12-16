const cargarClimas = async (cantidad, desde) => {

    try{
        //parametros pasados a Int ya que los usaremos como numeros.
        cantidad = parseInt(cantidad);
        desde = parseInt(desde);
        const link = 'http://localhost:3000/api/datosClima?cantidad=' + 
                        cantidad + '&from=' + desde;

        //Contenedor de la tabla en el historial y botones de siguiente y anterior
        const $contenedorTabla = document.querySelector("#ContenedorTabla");
        const $botones = document.querySelector(".botones");
    
        //Variables que guardaran a lo largo lo que se pondrá en el html de lo anterior
        let $htmlTabla = ``;
        let $htmlBotones = ``;

        //Realiza el get a la Api y guarda la respuesta como json
        try {
            respuesta = await fetch(link);
            var climas = await respuesta.json();
        } catch (error) {
            throw error;
        }

        //For que carga toda la variable $htmlTabla con los valores en climas.
        for(let i = 0, elementoActual = {}, keyElemento; i < cantidad; i++){

            //Guarda la llave y el elemento actual para mayor claridad en el código.
            keyElemento = climas.sol_keys[cantidad - i - 1];
            elementoActual = climas[keyElemento];

            //Crea un div con toda la información utilizada del elemento actual.
            $htmlTabla +=  
                `<div id= "contenedorInfoElemento">
                    <div class="infoElemento">'
                        <h2 class="tituloInfo">${elementoActual.First_UTC.slice(8, 10)}/${elementoActual.First_UTC.slice(5, 7)}</h2>
                        <h3 class="dato datoSuperior">${Math.round(elementoActual.AT.av)}ºC</h3>
                        <h3 class="dato">Sol ${keyElemento}</h3>
                    </div>
                    <div class="infoElemento">
                        <h2 class="tituloInfo">Temperatura atmosférica</h2>
                        <h3 class="dato datoSuperior">Promedio: ${Math.round(elementoActual.AT.av)}°C</h3>
                        <h3 class="dato">Min: ${Math.round(elementoActual.AT.mn)}°C</h3>
                        <h3 class="dato">Max: ${Math.round(elementoActual.AT.mx)}°C</h3>
                    </div>
                    <div class="infoElemento">
                        <h2 class="tituloInfo">Presión atmosférica</h2>
                        <h3 class="dato datoSuperior">Promedio: ${+elementoActual.PRE.av.toFixed(2)} Pa</h3>
                        <h3 class="dato">Min: ${+elementoActual.PRE.mn.toFixed(2)} Pa</h3>
                        <h3 class="dato">Max: ${+elementoActual.PRE.mx.toFixed(2)} Pa</h3>
                    </div>
                    <div class="infoElemento">
                        <h2 class="tituloInfo">Velocidad del viento</h2>
                        <h3 class="dato datoSuperior">Promedio: ${+elementoActual.HWS.av.toFixed(3)} m/s</h3>
                        <h3 class="dato">Min: ${+elementoActual.HWS.mn.toFixed(3)} m/s</h3>
                        <h3 class="dato">Max: ${+elementoActual.HWS.mx.toFixed(3)} m/s</h3>
                    </div>
                </div>`
        }

        //carga el html a el contenedor de la tabla.
        $contenedorTabla.innerHTML = $htmlTabla;

        //Carga los botones a html botones, usando los ifs para verificar los límites.
        if(desde != 0)
            //si desde es 0 significa que no es necesario el boton Anteriores.
            $htmlBotones += `<a cantidad = "10" desde = "${desde - 10}"> ⏮️ </a>`;
        if(climas.restantes != 0){
            //Si no hay climas restantes significa que no es necesario el boton Siguientes.
            if(climas.restantes < 10){
                //Si hay menos de 10 climas restantes, ajusta el parametro cantidad
                $htmlBotones += `<a cantidad = "${climas.restantes}" desde = "${desde + cantidad}"> ⏭️ </a>`
            } else {
                $htmlBotones += `<a cantidad = "10" desde = "${desde + cantidad}"> ⏭️ </a>`
            }
        }
        
        //Se carga el html de los botones
        $botones.innerHTML = $htmlBotones;

    } catch (error) {
        throw error;
    }
}

//Se agregan listener, el de cuando se carga la pagina, y otro para que los botones funcionen.
document.addEventListener("DOMContentLoaded", () => cargarClimas(10, 0));
document.addEventListener("click", e => {
    if(e.target.matches(".botones a")){
        e.preventDefault();
        cargarClimas(e.target.getAttribute("cantidad"), e.target.getAttribute("desde"));
    }
});