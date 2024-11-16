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
    // Limpia los filtros
    document.getElementById('zona').value = '';
    document.getElementById('impresora').value = '';
    document.getElementById('materiales').value = '';
    document.getElementById("TodosPerfiles").innerHTML = "";
    perfilesCargados.forEach(crearPerfil);
}

//Filtro x necesidad desde el back
/*
document.getElementById("aceptar-button").addEventListener("click", () => {
    const zona = document.getElementById("zona").value;
    const modeloImpresora = document.getElementById("impresora").value;
    const materiales = document.getElementById("materiales").value;
    //Limpiar los perfiles actuales antes de aplicar el nuevo filtro
    document.getElementById("TodosPerfiles").innerHTML = "";

    fetch(`https://print-me-ten.vercel.app/vendedores/vendedor/get?zona=${zona}&impresora=${modeloImpresora}&materiales=${materiales}`)
        .then(response => response.json())
        .then(data => {
            // Clear the current profiles
            document.getElementById("TodosPerfiles").innerHTML = "";

            if (Array.isArray(data.vendedor)) {
                // Display the filtered profiles
                data.vendedor.forEach(crearPerfil);
            } else {
                console.error("La propiedad 'vendedor' no es un array:", data);
            }
        })
        .catch(error => console.error("Error al cargar perfiles:", error));
});*/

//Filtro x necesidad desde el front
document.getElementById("aceptar-button").addEventListener("click", () => {
    const zona = document.getElementById("zona").value.toLowerCase();
    const modeloImpresora = document.getElementById("impresora").value.toLowerCase();
    const materiales = document.getElementById("materiales").value.toLowerCase();

    // Clear the current profiles
    document.getElementById("TodosPerfiles").innerHTML = "";

    console.log("Selected filters:", { zona, modeloImpresora, materiales });

    // Filter perfilesCargados array based on selected values
    const filteredProfiles = perfilesCargados.filter(vendedor => {
        const matchesZona = vendedor.zona.toLowerCase() === zona || !zona;
        const matchesModelo = vendedor.impresora_modelo.toLowerCase() === modeloImpresora || !modeloImpresora;
        const matchesMateriales = vendedor.impresora_materiales.toLowerCase() === materiales || !materiales;

        console.log("Profile:", vendedor);
        console.log("Matches Zona:", matchesZona);
        console.log("Matches Modelo:", matchesModelo);
        console.log("Matches Materiales:", matchesMateriales);

        return matchesZona && matchesModelo && matchesMateriales;
    });

    console.log("Filtered Profiles:", filteredProfiles);

    // Display the filtered profiles
    if (filteredProfiles.length > 0) {
        filteredProfiles.forEach(crearPerfil);
    } else {
        console.log("No profiles match the selected filters.");
    }
});

