/*// Recuperar el token y el ID del cliente desde localStorage
const token = localStorage.getItem('token');
const clientId = localStorage.getItem('clientId');
console.log('Token:', token);
console.log('ID del Cliente:', clientId);*/

//simulando un token y id hasta que ande el login y pueda usar los datos posta
const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const fakeID = 3

fetch(`https://print-me-ten.vercel.app/compradores/compradorByID/${fakeID}`, {
    headers: {
        'Authorization': `Bearer ${fakeToken}`,
        'Content-Type': 'application/json'
    }
})

// Cargar datos del perfil al iniciar
document.addEventListener("DOMContentLoaded", () => {
    fetch(`https://print-me-ten.vercel.app/compradores/compradorByID/${fakeID}`, {
        headers: {
            'Authorization': `Bearer ${fakeToken}`,  // Añadir el token en el encabezado
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al cargar los datos. Verifica el token.");
            }
        })
        .then(data => {
            document.getElementById("nombre-apellido").value = data.nombre;
            document.getElementById("descripcion").value = data.descripcion;
            document.getElementById("mail").value = data.email;
            console.log(data);
        })
        .catch(error => console.error("Error al cargar datos del perfil:", error));
});

// Guardar datos del perfil
function guardarDatosPerfil() {
    const perfilData = {
        nombre: document.getElementById("nombre-apellido").value,
        descripcion: document.getElementById("descripcion").value,
        email: document.getElementById("mail").value,
    };

    fetch(`https://print-me-ten.vercel.app/compradores/comprador/${fakeID}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${fakeToken}`,  // Añadir el token en el encabezado
            'Content-Type': 'application/json'
        },
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
