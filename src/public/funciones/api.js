
const cargarImagenDelDia = async() =>{
    // Obtiene la imagen del dia y se la agrega como fondo en la pagina de inicio.
    try {

        let fechaActual = new Date();
        let zonaHoraria = fechaActual.getTimezoneOffset() * 60000;
        fechaActual = new Date(fechaActual.getTime() - zonaHoraria);
        let fechaTxt, mes, dia;
        mes = fechaActual.getMonth() + 1
        dia = fechaActual.getDate();

        fechaTxt = fechaActual.getFullYear() + '-';

        if (mes < 10)
            fechaTxt += '0' + mes + '-';
        else
            fechaTxt += mes + '-';

        if (dia < 10)
            fechaTxt += '0' + dia;
        else
            fechaTxt += dia;
        
        respuesta = await fetch('http://localhost:3000/api/imagenes/' + fechaTxt);
        let dato = await respuesta.json();
        
        // En caso que el dato no sea un video se cambia el fondo del contenedor.
        if (dato.media_type == "imagen" ){
            let contenedorImagen = document.getElementById("contenedorInfoPrincipal");
            contenedorImagen.setAttribute("style", "background-image: url(" + dato.url + ");");
        }
        
    } catch (error) {
        console.log(error);
    }
}

cargarImagenDelDia();
