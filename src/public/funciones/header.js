const importarHeader = async() => {
    //Se agrega codigo HTML del URL indicado al elemento header.
    try {
        const res = await fetch('/html/header.html');
        const codigo = await res.text();
        const header = document.querySelector('header');
        header.insertAdjacentHTML('afterbegin', codigo);
    }
    catch (error) {
        console.log(error);
      }
}

importarHeader();
