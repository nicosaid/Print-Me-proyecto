document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado");
    cargarPerfil();


/*function seleccionarPerfil(idPerfilSeleccionado) {
    localStorage.setItem('perfilSeleccionado', idPerfilSeleccionado);
    window.location.href = 'usuario/html/perfilduenio.html';
}*/

function cargarPerfil() {
    const params = new URLSearchParams(window.location.search);
    const idVendedor = params.get('id');  // Obtén el id de la URL

    if (idVendedor) {
        fetch(`https://print-me-ten.vercel.app/vendedores/vendedorByID/${idVendedor}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.message) {
                    crearPerfil(data.message); // Aquí pasamos el objeto vendedor directamente
                } else {
                    console.error("No se encontraron datos para el vendedor:", data);
                }
            })
            .catch(error => console.error("Error al cargar el perfil:", error));
    } else {
        console.error("ID del perfil no encontrado en la URL");
    }
}

function crearPerfil(vendedor) {
    console.log("vendedor:", vendedor);
    fetch(`https://print-me-ten.vercel.app/vendedores/vendedorByID/${vendedor.id}`)
    .then(response => response.json())
    .then(data => {
        if (data && data.message) {
            // Crear un div contenedor para cada perfil
            const perfilDiv = document.createElement("div");
            perfilDiv.classList.add("card"); // clase del CSS

            perfilDiv.innerHTML = `
                <img src="../fotos/impresora 3d.png" alt="Impresora" class="printer-image">
                <h2>${data.message.nombre_apellido}</h2>
                <p class="stats">${data.message.descripcion}</p>

                <button class="button" onclick="MoverID(${data.message.id})">
                    Ir al Perfil
                    <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            `;

            // Añadir la tarjeta de perfil al contenedor principal
            document.getElementById("TodosPerfiles").appendChild(perfilDiv);
            perfilDiv.classList.add("info");
        } else {
            console.error("No se encontraron datos para el vendedor:", data);
        }
    })
    .catch(error => console.error("Error al cargar perfiles:", error));
}

function MoverID(idPerfilSeleccionado){
    console.log("idPerfilSeleccionado:", idPerfilSeleccionado);
    window.location.href = `/usuario/html/perfilduenio.html?id=${idPerfilSeleccionado}`; 
    const vendedor = data.vendedor; // Extrae el objeto 'vendedor'
    console.log(vendedor);
    if (vendedor && vendedor.numero_telefonico) {
      numeroTelefono = vendedor.numero_telefonico;
  } else {
      console.warn("No se encontró 'numero_telefonico' en la respuesta de vendedor");
  }
      document.getElementById('nombre').textContent  = vendedor.nombre_apellido;
      document.getElementById('imagen').src = "../fotos/impresoraperfil.png";
      document.getElementById('desc').value  = vendedor.descripcion || "Sin descripción";
      document.getElementById('impresora-info').textContent  = vendedor.impresora_modelo || "Impresora no especificado";
      document.getElementById('filamento-info').textContent  = vendedor.impresora_materiales || "Filamento no especificado";//cambio de pantalla y le paso el id
}
        
  
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
});

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
