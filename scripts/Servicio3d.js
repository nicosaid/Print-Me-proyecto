function crearPerfil(vendedor) {
    // Crear un div contenedor para cada perfil
    const perfilDiv = document.createElement("div");
    perfilDiv.classList.add("info");//clase del css

    // Crear y añadir imagen
    const img = document.createElement("img");
    img.src = vendedor.imagen; //!cambiar vendedor.imagen al campo del backend
    img.alt = "Imagen de " + vendedor.nombre;
    perfilDiv.appendChild(img);

    // Crear y añadir nombre
    const nombre = document.createElement("h3");
    nombre.textContent = vendedor.nombre;
    perfilDiv.appendChild(nombre);

    // Crear y añadir botón "Ir al Perfil"
    const botonPerfil = document.createElement("button");
    botonPerfil.textContent = "Ir al Perfil";
    botonPerfil.addEventListener("click", () => {
        // !Redirigir o manejar evento para el perfil
        window.location.href = `/vendedor/${vendedor.id}`;
    });
    perfilDiv.appendChild(botonPerfil);

    // Agregar el perfil al contenedor principal
    document.getElementById("TodosPerfiles").appendChild(perfilDiv);
}

function cargarPerfiles() {
    fetch("http://localhost:3000/vendedores/buscar?q=benji")
        .then(response => response.json())
        .then(data => {
            data.forEach(crearPerfil);
        })
        .catch(error => console.error("Error al cargar perfiles:", error));
}

// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", cargarPerfiles);
