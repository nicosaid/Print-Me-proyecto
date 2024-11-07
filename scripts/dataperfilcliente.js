document.addEventListener("DOMContentLoaded", () => {
    fetch('https://print-me-ten.vercel.app/compradores/comprador/get')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            document.getElementById("editable-input").value = data.nombre;
            document.getElementById("description-input").value = data.descripcion;
            document.getElementById("email-input").value = data.email;

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
