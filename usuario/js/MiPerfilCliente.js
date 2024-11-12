// Obtén el token e ID del localStorage
const token = localStorage.getItem('token');
const id = localStorage.getItem('id');
console.log("Token actual:", token);
console.log("ID actual:", id);

//EDITAR DATOS

function editField(id) {
    var field = document.getElementById(id);
    field.disabled = false; // Habilita el campo para edición
    field.classList.remove('disabled'); // Elimina la clase de estilo deshabilitado

    // Cambiar el botón a un botón de guardar
    var button = field.nextElementSibling;
    button.innerHTML = '<i class="fas fa-save"></i>';
    button.setAttribute('onclick', 'saveField("' + id + '")');
}

function saveField(id) {
    var field = document.getElementById(id);
    field.disabled = true; // Deshabilita el campo nuevamente
    field.classList.add('disabled'); // Agrega la clase de estilo deshabilitado

    var button = field.nextElementSibling;
    button.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    button.setAttribute('onclick', 'editField("' + id + '")');

    alert('Cambios guardados para el campo: ' + id);
}

//CONEXION

// Cargar datos del perfil al iniciar
document.addEventListener("DOMContentLoaded", () => {
    fetch(`https://print-me-ten.vercel.app/compradores/compradorByID${token}`, { 
        headers: {
            'Authorization': `Bearer ${token}`,  // Añadir el token en el encabezado
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

    fetch(`https://print-me-ten.vercel.app/compradores/comprador/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${id}`,
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

//HACER EL CAMBIAR CONTRASEÑA