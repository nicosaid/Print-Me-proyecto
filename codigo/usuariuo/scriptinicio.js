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
function menu (){
    const btn = document.getElementById('menu-icon'); 
    const menu = document.querySelector('.contenedor-opciones');
    let n = 0; 

    function saludo () {
        if (n == 0){
            menu.style.display = 'none';
            n = 1; 
        } else if (n == 1){
            menu.style.display = 'block';
            n = 0; 
        }
    }
    btn.addEventListener("click", saludo);

function cerrarsesion()
{
const enlace = document.getElementById('cerrarSesion');
const modal = document.getElementById('VentanaConfirmar');
const confirmarBtn = document.getElementById('confirmarBtn');
const cancelarBtn = document.getElementById('cancelarBtn');

// Mostrar el modal al hacer clic en el enlace
enlace.addEventListener('click', function(event) {
    event.preventDefault(); // Evitar la navegación
    modal.style.display = 'block'; // Mostrar el modal
});

// Confirmar y proceder a la navegación
confirmarBtn.onclick = function() {
    window.location.href = enlace.href; // Navegar a la URL
}

// Cancelar y cerrar el modal
cancelarBtn.onclick = function() {
    modal.style.display = 'none';
}
}
}