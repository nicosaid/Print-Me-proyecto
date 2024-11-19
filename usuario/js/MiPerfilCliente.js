// Obtén el token e ID del localStorage
const token = localStorage.getItem('token');
const id = localStorage.getItem('id');
console.log("Token actual:", token);
console.log("ID actual:", id);

if (id) {
    // Hacer una petición al backend para obtener los datos
    fetch(`https://print-me-ten.vercel.app/vendedores/vendedorByID/${id}`) // Reemplaza con tu URL
      .then(response => response.json())
      .then(data => {
        // Rellenar los campos con los datos obtenidos
        document.getElementById('nombre-apellido').value = data.nombre_apellido || '';
        document.getElementById('descripcion').value = data.descripcion || '';
        document.getElementById('email').value = data.mail || '';
        document.getElementById('zona').value = data.zona || '';
        document.getElementById('impresora').value = data.impresora_modelo || '';
        document.getElementById('filamento').value = data.impresora_materiales || '';
  
        // Configurar el radio button según el valor de post_procesado
        if (data.post_procesado) {
          document.getElementById('postSi').checked = true; // Selecciona "Sí"
        } else {
          document.getElementById('postNo').checked = true; // Selecciona "No"
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  } else {
    console.error('No se encontró id en localStorage.');
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