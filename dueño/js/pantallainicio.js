document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado");
    cargarPerfiles();
});

/*function seleccionarPerfil(idPerfilSeleccionado) {
    localStorage.setItem('perfilSeleccionado', idPerfilSeleccionado);
    window.location.href = 'usuario/html/perfilduenio.html';
}*/

function Solicitudes(comprador) {
    console.log("comprador:", comprador);

    // Crear un div contenedor para cada solicitud
    const perfilDiv = document.createElement("div");
    perfilDiv.classList.add("info");//clase del css

    // Crear y añadir imagen
    const img = document.createElement("img");
    img.src = "../fotos/impresora 3d.png"; 
    perfilDiv.appendChild(img);

    // Crear y añadir nombre
    const nombre = document.createElement("h2");
    nombre.textContent = comprador.nombre_apellido;
    perfilDiv.appendChild(nombre);

    // Crear y añadir botón "Aceptar"
    const BotonAceptar = document.createElement("button");
    botonPerfil.textContent = "Aceptar";
    botonPerfil.classList.add("aceptar");
    perfilDiv.appendChild(BotonAceptar);

    // Crear y añadir botón "Rechazar"
    const BotonRechazar = document.createElement("button");
    botonPerfil.textContent = "Rechazar";
    botonPerfil.classList.add("rechazar");
    perfilDiv.appendChild(BotonRechazar);

    // Agregar el perfil al contenedor principal
    document.getElementById("solicitudes").appendChild(perfilDiv);
}

function cargarPedidos() {
    fetch("https://print-me-ten.vercel.app/pedidos/pedidos ")
        .then(response => response.json())
        .then(data => {
            console.log("Data recibida:", data);
            if (Array.isArray(data.comprador)) {
                data.comprador.forEach(cargarPedidos);
            } else {
                console.error("La propiedad 'vendedor' no es un array:", data);
            }
        })
        .catch(error => console.error("Error al cargar perfiles:", error));
}

function buscarPerfiles() {
    document.getElementById("TodosPerfiles").innerHTML = "";
    const searchInput = document.getElementById('buscador').value.toLowerCase(); // Obtener el valor del buscador en minúsculas
    fetch("https://print-me-ten.vercel.app/vendedores/buscar?q=" + searchInput) 
        .then(response => response.json())
        .then(data => {
            console.log("Data recibida:", data);
            if (Array.isArray(data.message)) {
                data.message.forEach(crearPerfil);
            } else {
                console.log(data.message);
                console.error("La propiedad 'message' no es un array:", data);
            }
        })
        .catch(error => console.error("Error al cargar perfiles:", error));
}