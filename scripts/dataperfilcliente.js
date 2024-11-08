// Recuperar el token y el ID del cliente desde localStorage
const token = localStorage.getItem('token');
const clientId = localStorage.getItem('clientId');
console.log('Token:', token);
console.log('ID del Cliente:', clientId);

//pedir datos para el form
document.addEventListener("DOMContentLoaded", () => {
    fetch('https://print-me-ten.vercel.app/compradores/compradorByID/' + )
        .then(response => response.json())
        .then(data => {
            document.getElementById("nombre-apellido").value = data.nombre;
            document.getElementById("descripcion").value = data.descripcion;
            document.getElementById("mail").value = data.email;
            console.log(data);
        })
        .catch(error => console.error("Error al cargar datos del perfil:", error));
});

function guardarDatosPerfil() {
    const perfilData = {
        nombre: document.getElementById("editable-input").value,
        descripcion: document.getElementById("description-input").value,
        email: document.getElementById("email-input").value,
    
    };

    fetch('https://print-me-ten.vercel.app/compradores/comprador/get', {  
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(perfilData)
    })
    .then(response => {
        if (response.ok) {
            alert("Datos actualizados correctamente.");
        } else {
            alert("Error al actualizar los datos.");
        }
    })
    .catch(error => console.error("Error al actualizar datos:", error));
}
