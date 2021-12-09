const importarFooter = async() => {
    //Se agrega codigo HTML del URL indicado al elemento footer.
    try {
        const res = await fetch('/html/footer.html');
        const codigo = await res.text();
        const footer = document.querySelector('footer');
        footer.insertAdjacentHTML('afterbegin', codigo);
    }
    catch (error) {
        console.log(error);
      }
}

importarFooter();

