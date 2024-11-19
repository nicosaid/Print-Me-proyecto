// Obtén el token e ID del localStorage
function obtenerDatosVendedor() {

    const token = localStorage.getItem('token');
    const loginID = localStorage.getItem('LoginId');
    
    if (!loginID) {
        console.error('ID no definido');
        return;
    }

    const loginIDNumber = Number(loginID);

    console.log("Token actual:", token);
    console.log("ID actual:", loginIDNumber);

    fetch(`https://print-me-ten.vercel.app/vendedores/vendedorByID/${loginIDNumber}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
})
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
          const vendedor = data.vendedor;
          console.log(vendedor);
          if (vendedor && vendedor.numero_telefonico) {
            numeroTelefono = vendedor.numero_telefonico;
        } else {
            console.warn("No se encontró 'numero_telefonico' en la respuesta de vendedor");
        }
            document.getElementById('nombre').textContent  = vendedor.nombre_apellido;
            document.getElementById('imagen').src = "../fotos/impresoraperfil.png";
            document.getElementById('desc').value  = vendedor.descripcion || "Sin descripción";
            document.getElementById('impresora-info').textContent  = vendedor.impresora_modelo;
            document.getElementById('filamento-info').textContent  = vendedor.impresora_materiales;
            
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}

obtenerDatosVendedor();
/*
function guardarCambiosPerfil() {
    const perfilData = {
        nombre: document.getElementById("editable-input").value,
        descripcion: document.getElementById("description-input").value,
        email: document.getElementById("email-input").value,
        zona: document.getElementById("zona-select").value,
        impresora: document.getElementById("impresora-input").value,
        filamento: document.getElementById("filamento-input").value,
        postImpresion: document.querySelector('input[name="post-impresion"]:checked').value === 'sí'
    };

    fetch('https://print-me1.vercel.app/vendedores/vendedorByID/1', {  
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
}*/
