
/*Cada vez que se hace click en la fecha del menu, aparece un submenu plegable */
let listaMenu = document.querySelectorAll('.itemsSubMenu');

listaMenu.forEach(cadaItem =>{
    /*Se registra un click en la imagen */
    cadaItem.addEventListener('click', () => {
        cadaItem.classList.toggle('flecha'); /*Animacion en imagen*/

        let altura = 0;
        let menuInterno = cadaItem.nextElementSibling;

        if (menuInterno.clientHeight == "0"){ 
            altura = menuInterno.scrollHeight; /*Altura minima de un elemento para evitar desborde*/
        }
        menuInterno.style.height = altura +'px';
    })
})

/*const contador = document.querySelectorAll('.contador');
const tiempo = 200;

contador.forEach(contador => {
    const actualizarContador = () => {
        const puntero= + contador.getAttribute('dato-puntero');
        const cuenta = +contador.innerText;
        const inc = puntero / tiempo;

        if (cuenta < puntero){
            contador.innerText = cuenta + inc;
            setTimeout(undateCount, 1);
        }else{
            cuenta.innerText = puntero;
        }
    }
})

*/