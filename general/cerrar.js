document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    const logoutModal = document.getElementById("logoutModal");
    const confirmLogout = document.getElementById("confirmLogout");
    const cancelLogout = document.getElementById("cancelLogout");

    // Abrir el modal al hacer clic en el botón de "Cerrar Sesión"
    logoutBtn.addEventListener("click", (event) => {
        event.preventDefault();
        logoutModal.style.display = "flex"; // Mostrar el modal como flex
    });

    // Cerrar el modal al hacer clic en "Cancelar"
    cancelLogout.addEventListener("click", () => {
        logoutModal.style.display = "none"; // Ocultar el modal
    });

    // Acción de cerrar sesión al confirmar
    confirmLogout.addEventListener("click", () => {
        // Lógica de cierre de sesión aquí
        alert("Sesión cerrada"); // Mensaje de prueba o redirige a otra página
        logoutModal.style.display = "none";
    });

    // Cerrar el modal al hacer clic fuera del contenido del modal
    window.addEventListener("click", (event) => {
        if (event.target === logoutModal) {
            logoutModal.style.display = "none";
        }
    });
});

