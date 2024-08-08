function Botonmenu () 
{
    const btn = document.getElementById('menu-icon'); 
    const menu = document.querySelector('.contenedor-opciones')
    let n = 0; 
    function saludo () {
        if (n == 0){
            menu.style.opacity = '1';
            n = 1; 
        }
        else if (n == 1){
            menu.style.opacity = '0';
            n = 0; 
        }
    }
    btn.addEventListener("click", saludo)

}