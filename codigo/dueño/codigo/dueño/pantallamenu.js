let btn = document.getElementById('menu-icon')
let menu = document.getElementsByClassName('contenedor-opciones')
function saludo () {
    menu.style.transform('100px');
}

btn.addEventListener('click', saludo)
