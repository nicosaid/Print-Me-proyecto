function cerrarSesion() {
    localStorage.removeItem('LoginId');
    localStorage.removeItem('token');
    window.location.href = "/general/landing/index.html";
}

document.getElementById("cerrar-sesion-btn").addEventListener("click", cerrarSesion);