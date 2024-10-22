// Obtener elementos
const logoutLink = document.getElementById('logoutLink');
const modal = document.getElementById('logoutModal');
const confirmLogout = document.getElementById('confirmLogout');
const cancelLogout = document.getElementById('cancelLogout');

// Mostrar la ventana emergente al hacer clic en "Cerrar Sesión"
logoutLink.onclick = function(event) {
    event.preventDefault(); // Evitar que el enlace recargue la página
    modal.style.display = "flex"; // Mostrar modal
}

// Al hacer clic en "Cancelar"
cancelLogout.onclick = function() {
    modal.style.display = "none"; // Ocultar modal
}

// Al hacer clic en "Sí, cerrar sesión"
confirmLogout.onclick = function() {
    // Aquí puedes agregar la lógica para cerrar sesión
    alert("Sesión cerrada"); // Ejemplo de cierre de sesión
    modal.style.display = "none"; // Ocultar modal
}

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none"; // Ocultar modal
    }
}