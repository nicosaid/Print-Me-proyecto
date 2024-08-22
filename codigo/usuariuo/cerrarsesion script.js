function cerrarsesion()
{
const enlace = document.getElementById('cerrarSesion');
const modal = document.getElementById('VentanaConfirmar');
const confirmarBtn = document.getElementById('confirmarBtn');
const cancelarBtn = document.getElementById('cancelarBtn');
//getElementByID o QuerySelector

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