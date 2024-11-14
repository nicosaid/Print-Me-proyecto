document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado");
    cargarPerfiles();
});

/*function seleccionarPerfil(idPerfilSeleccionado) {
    localStorage.setItem('perfilSeleccionado', idPerfilSeleccionado);
    window.location.href = 'usuario/html/perfilduenio.html';
}*/

function crearPerfil(vendedor) {
    console.log("vendedor:", vendedor);

    // Crear un div contenedor para cada perfil
    const perfilDiv = document.createElement("div");
    perfilDiv.classList.add("card");//clase del css

    perfilDiv.innerHTML = `
        <img src="../fotos/impresora 3d.png" alt="Impresora" class="printer-image">
        <h2>${vendedor.nombre_apellido}</h2>
        <p class="stats">${vendedor.descripcion}</p>

        <button class="button" onclick="MoverID(${vendedor.id})">
            Ir al Perfil
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clip-rule="evenodd"></path>
            </svg>
        </button>

        <label class="containerlike">
            <input type="checkbox">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
            </svg>
        </label>
    `;

    document.getElementById("TodosPerfiles").appendChild(perfilDiv);
    perfilDiv.classList.add("info");
}

function MoverID(idPerfilSeleccionado){
    console.log("idPerfilSeleccionado:", idPerfilSeleccionado);
    window.location.href = `/usuario/html/perfilduenio.html?id=${idPerfilSeleccionado}`; //cambio de pantalla y le paso el id
}

    // Crear el contenedor de favoritos
    const favoriteLabel = document.createElement("label");
    favoriteLabel.classList.add("containerlike");
    favoriteLabel.innerHTML = `
        <input type="checkbox">
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
        </svg>
    `;
    perfilCard.appendChild(favoriteLabel);

    // Agregar la tarjeta de perfil al contenedor principal
    document.getElementById("TodosPerfiles").appendChild(perfilCard);
function buscarPerfiles() {
    // Limpia el contenedor de perfiles antes de realizar la búsqueda
    const todosPerfiles = document.getElementById("TodosPerfiles");
    todosPerfiles.innerHTML = "";

    // Obtiene el valor del campo de búsqueda en minúsculas
    const searchInput = document.getElementById('buscador').value.toLowerCase();

    // Realiza la petición de búsqueda a la API
    fetch(`https://print-me-ten.vercel.app/vendedores/buscar?q=${encodeURIComponent(searchInput)}`)
        .then(response => response.json())
        .then(data => {
            console.log("Data recibida:", data);

            // Verifica que `data.message` sea un array
            if (Array.isArray(data.message)) {
                // Si hay resultados, crea los perfiles
                if (data.message.length > 0) {
                    // Limpia el mensaje de "no hay resultados" si ya existe
                    const existingNoResultsMessage = document.querySelector(".no-results-message");
                    if (existingNoResultsMessage) {
                        existingNoResultsMessage.remove();
                    }

                    // Crea y muestra los perfiles
                    data.message.forEach(crearPerfil);
                } else {
                    // Si no hay resultados, muestra el mensaje
                    const noResultsMessage = document.createElement("p");
                    noResultsMessage.textContent = "No hay perfiles que coincidan con la búsqueda.";
                    noResultsMessage.classList.add("no-results-message");
                    todosPerfiles.appendChild(noResultsMessage); // Aquí agregas el mensaje
                }
            } else {
                console.error("La propiedad 'message' no es un array:", data);
            }
        })
        .catch(error => console.error("Error al cargar perfiles:", error));
}

//FILTROS

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
/*
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
