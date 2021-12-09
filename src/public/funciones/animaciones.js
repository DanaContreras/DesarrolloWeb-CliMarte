const efectoMenuDesplegable = () => {
    /*Cada vez que se hace click en la fecha del menu, aparece un submenu plegable */
    let header = document.querySelector('header');

    let observer = new MutationObserver(() => {

        let listaMenu = document.getElementsByClassName('itemsSubMenu')
        let max = listaMenu.length;
        for (let i = 0; i < max; i++) {

            const cadaItem = listaMenu[i];
            /*Se registra un click en la imagen */
            cadaItem.addEventListener('click', () => {
                cadaItem.classList.toggle('flecha'); /*Animacion en imagen*/
    
                let altura = 0;
                let menuInterno = cadaItem.nextElementSibling;
    
                if (menuInterno.clientHeight === 0) {
                    altura = menuInterno.scrollHeight; /*Altura minima de un elemento para evitar desborde*/
                }
                menuInterno.style.height = altura + 'px';
            })
        }  
    })

    observer.observe (header, {attributes: true, childList: true, subtree: true});
    
}

const efectoConteo = () => {

    /*Animación para los valores principales que se muestran por pantalla. Conteo animado.*/
    const contadores = document.querySelectorAll('.valorContador');
    const tiempoTotal = 30;

    contadores.forEach(contador => {
        let numActual = 0;
        let increm = 1;
        const puntero = contador.getAttribute('valor');

        let tiempo = setInterval(() => {
            if (puntero < 0) {
                increm = -1
            }

            contador.textContent = numActual += increm;

            if (numActual == puntero) {
                clearInterval(tiempo);
            }

        }, tiempoTotal);
    })
}

efectoMenuDesplegable();
efectoConteo();
