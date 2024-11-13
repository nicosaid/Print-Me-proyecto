document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado");
    cargarPerfiles();
});

function seleccionarPerfil(idPerfilSeleccionado) {
    localStorage.setItem('perfilSeleccionado', idPerfilSeleccionado);
    window.location.href = 'usuario/html/perfilduenio.html';
}

function crearPerfil(vendedor) {
    console.log("vendedir:",vendedor);

    // Crear un div contenedor para cada perfil
    const perfilDiv = document.createElement("div");
    perfilDiv.classList.add("info");//clase del css

    // Crear y añadir imagen
    const img = document.createElement("img");
    img.src = vendedor.imagen; //!cambiar vendedor.imagen al campo del backend
    img.alt = "Imagen de " + vendedor.nombre_apellido;
    perfilDiv.appendChild(img);

    // Crear y añadir nombre
    const nombre = document.createElement("h2");
    nombre.textContent = vendedor.nombre_apellido;
    perfilDiv.appendChild(nombre);

    // Crear y añadir descripción
    const descripcion = document.createElement("p");
    descripcion.textContent = vendedor.descripcion;
    perfilDiv.appendChild(descripcion);

    // Crear y añadir botón "Ir al Perfil"
    const botonPerfil = document.createElement("button");
    botonPerfil.textContent = "Ir al Perfil";
    botonPerfil.classList.add("button");
    botonPerfil.onclick = () => {
        redirectWithDelay(`/vendedor/${vendedor.id}`);
    };
    perfilDiv.appendChild(botonPerfil);

    // Agregar el perfil al contenedor principal
    document.getElementById("TodosPerfiles").appendChild(perfilDiv);
}

function cargarPerfiles() {
    fetch("http://print-me1.vercel.app/vendedores/vendedorByID/1 ") //esta ruta o la del buscador?
        .then(response => response.json())
        .then(data => {
            console.log("Data recibida:", data);
            if (Array.isArray(data.message)) {
                data.message.forEach(crearPerfil);
            } else {
                console.error("La propiedad 'message' no es un array:", data);
            }
        })
        .catch(error => console.error("Error al cargar perfiles:", error));
}

//FILTROS
/*      
 // Función para filtrar perfiles según el tipo
        function filterProfiles(info) {
            const profiles = document.querySelectorAll('.profile');
            profiles.forEach(profile => {
                // Mostrar u ocultar según el tipo de filtro
                if (type === 'todos') {
                    profile.style.display = 'block';
                } else if (type === 'favoritos') {
                    if (profile.classList.contains('favorito')) {
                        profile.style.display = 'block';
                    } else {
                        profile.style.display = 'none';
                    }
                }
            });
        }

// FILTRO FAVORITOS

    function toggleFavorite(spanElement) {
        const profile = spanElement.parentElement; // Obtener el perfil al que pertenece el span
        profile.classList.toggle('containerlike'); // Alternar la clase 'favorito'
    }


// FILTRAR POR NECESIDAD
function applyFilters() {
    const selectedZona = document.getElementById('zona').value;
    const selectedModelo = document.getElementById('modelo').value;
    const selectedMaterial = document.getElementById('materiales').value;
    const profiles = document.querySelectorAll('.profile');

    profiles.forEach(profile => {
        const zonaMatch = selectedZona === "" || profile.dataset.zona === selectedZona;
        const modeloMatch = selectedModelo === "" || profile.dataset.modelo === selectedModelo;
        const materialMatch = selectedMaterial === "" || profile.dataset.material === selectedMaterial;

        profile.style.display = (zonaMatch && modeloMatch && materialMatch) ? 'block' : 'none';
    });
    hidePopup(); // Cerrar el pop-up al aplicar los filtros
}

// AJAX request
fetch('/getProfiles', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ zona: selectedZona, modelo: selectedModelo, material: selectedMaterial })
})
    .then(response => response.json())
    .then(data => {
        const profilesSection = document.getElementById('profiles');
        profilesSection.innerHTML = ''; // Clear previous profiles

        // Populate profiles with new data
        data.forEach(profile => {
            const profileElement = document.createElement('div');
            profileElement.classList.add('profile');
            profileElement.innerHTML = `
            <img src="${profile.image}" alt="Impresora 3D">
            <p>${profile.name}</p>
            <span>${profile.views} vistas</span>
            <span>${profile.comments} comentarios</span>
        `;
            profilesSection.appendChild(profileElement);
        });
    })
    .catch(error => console.error('Error fetching profiles:', error)); 
    */
