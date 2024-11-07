//LOS DATOS VIENEN DEL TOKEN, LE TENGO Q PEDIR AL BACK Q HAGA UN JSON WEB TOKEN, Q ME LO PASE, Y YO EN CODIGO SE LO VUELVO A PASAR PARA QUE RECONOZCA AL USER Y DE AHI ME PASA LOS DATOS
document.addEventListener("DOMContentLoaded", () => {
    fetch('https://print-me1.vercel.app/vendedores/vendedorByID/1')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            document.getElementById("editable-input").value = data.nombre;
            document.getElementById("description-input").value = data.descripcion;
            document.getElementById("email-input").value = data.email;
            document.getElementById("zona-select").value = data.zona;
            document.getElementById("impresora-input").value = data.impresora;
            document.getElementById("filamento-input").value = data.filamento;
            document.querySelector(`input[name="post-impresion"][value="${data.postImpresion ? 'sí' : 'no'}"]`).checked = true;
        })
        .catch(error => console.error("Error al cargar datos del perfil:", error));
});

function guardarDatosPerfil() {
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
}
