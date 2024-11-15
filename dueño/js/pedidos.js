document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado");
    cargarPerfiles();
});

function crearPerfil(vendedor) {
    console.log("vendedor:",vendedor);

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

        <label class="containerlike" >
            <input type="checkbox" onclick="FiltroFavoritos(this)">
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

let perfilesCargados = [];

function cargarPerfiles() {
    fetch("https://print-me-ten.vercel.app/vendedores/vendedor/get")
        .then(response => response.json())
        .then(data => {
            console.log("Data recibida:", data);
            if (Array.isArray(data.vendedor)) {
                perfilesCargados = data.vendedor;
                data.vendedor.forEach(crearPerfil);
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

//FILTROS
//marcar o desmarcar favorito
function FiltroFavoritos(checkbox) {
    const favoritos = document.querySelectorAll('.containerlike input:checked');
    console.log(favoritos.length);
    const perfilDiv = checkbox.closest(".card");
    if (checkbox.checked) {
        perfilDiv.classList.add("containerlike");
    } else {
        perfilDiv.classList.remove("containerlike");
    }
}

// Mostrar solo los perfiles favoritos
function mostrarFavoritos() {
    const perfiles = document.querySelectorAll('.card');
    perfiles.forEach(perfil => {
        // Verifica si el perfil tiene un checkbox marcado dentro del contenedor
        const checkbox = perfil.querySelector('.containerlike input');
        if (checkbox && checkbox.checked) {
            perfil.style.display = "block";
        } else {
            perfil.style.display = "none";
        }
    });
}

// Restablecer para mostrar todos los perfiles
function mostrarTodos() {
    const perfiles = document.querySelectorAll('.card');
    perfiles.forEach(perfil => {
        perfil.style.display = "block";
    });
}


function filtrarPerfiles() {
    const zonaSeleccionada = document.getElementById('zona').value;
    const impresoraSeleccionada = document.getElementById('impresora').value;
    const materialesSeleccionados = document.getElementById('materiales').value;
    const perfiles = document.querySelectorAll('.card');
    perfiles.forEach(perfil => {
        const zona = perfil.getAttribute('data-zona');
        const impresora = perfil.getAttribute('data-impresora');
        const materiales = perfil.getAttribute('data-materiales');

        const cumpleFiltroZona = zonaSeleccionada === "" || zona === zonaSeleccionada;
        const cumpleFiltroImpresora = impresoraSeleccionada === "" || impresora === impresoraSeleccionada;
        const cumpleFiltroMateriales = materialesSeleccionados === "" || materiales === materialesSeleccionados;

        // Muestra u oculta el perfil según los filtros
        if (cumpleFiltroZona && cumpleFiltroImpresora && cumpleFiltroMateriales) {
            perfil.style.display = "block";  // Muestra el perfil
        } else {
            perfil.style.display = "none";   // Oculta el perfil
        }
    });

    // Cierra el popup de filtro después de aplicar los filtros
    closePopup();
}
