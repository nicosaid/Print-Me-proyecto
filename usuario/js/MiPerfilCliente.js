/*// Recuperar el token y el ID del cliente desde localStorage
const token = localStorage.getItem('token');
const clientId = localStorage.getItem('clientId');
console.log('Token:', token);
console.log('ID del Cliente:', clientId);*/

//simulando un token y id hasta que ande el login y pueda usar los datos posta

const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const fakeID = 3;

// Revisa si los valores ya están en localStorage; si no, guarda los simulados
if (!localStorage.getItem('fakeToken') || !localStorage.getItem('fakeID')) {
    localStorage.setItem("fakeToken", fakeToken);
    localStorage.setItem("fakeID", fakeID);
}

// Obtén el token e ID del localStorage
const token = localStorage.getItem('fakeToken');
const clientId = localStorage.getItem('fakeID');
console.log("Token actual:", token);
console.log("ID actual:", clientId);

// Código para actualizar los datos con valores reales cuando estén disponibles
// (esto se ejecutaría solo cuando 'data' proviene de una respuesta de API)
if (typeof data !== 'undefined' && data.fakeToken && data.fakeID) {
    localStorage.setItem("fakeToken", data.fakeToken);
    localStorage.setItem("fakeID", data.fakeID);
} else {
    console.error("Datos no válidos o aún no disponibles");
}


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
    fetch(`https://print-me-ten.vercel.app/compradores/compradorByID`, { //agregar token alf ruta
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

//HACER EL CAMBIAR CONTRASEÑA