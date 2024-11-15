document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado");
    cargarPedidos();
});

function crearPedido(pedido) {
    console.log("pedido:",pedido);

    // Crear un div contenedor para cada perfil
    const pedidoDiv = document.createElement("div");
    pedidoDiv.classList.add("card");//clase del css

    pedidoDiv.innerHTML = `
        <img src="../fotos/impresora 3d.png" alt="Impresora" class="printer-image">
        <h2>${pedido.id_comprador}</h2>
        <button class="aceptar"  onclick="redirectWithDelay()">
                       Aceptar
                            <path
                                fill-rule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
        </button>
        <button class="rechazar"  onclick="redirectWithDelay()">
                       Rechazar
                            <path
                                fill-rule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
        </button>
    `;

    document.getElementById("TodosPedidos").appendChild(pedidoDiv);
    pedidoDiv.classList.add("info");
}

//hacer que el pedido lleve el nombre del cliente que lo pidio, tengo que hacer que segun el id que recibo, busoc el nombre del cliente y guardo eso en una avriable para usar en otras funciones
const idPerfilCLiente = ""
if (idPerfilCLiente) {
    fetch(`http://print-me-ten.vercel.app/compradores/compradorByID/${idPerfilCLiente}`)
        .then(response => response.json())
        .then(data => {
          const comprador = data.pedido.id_comprador; // Extrae el objeto 'id_comprador'
          console.log(comprador);
          if (comprador) {
            numeroTelefono = vendedor.numero_telefonico;
        } else{
            console.warn("No se encontró n en la respuesta de vendedor");
        }
    });
}

function MoverID(idPedidoSeleccionado){
    console.log("idPedidoSeleccionado:", idPedidoSeleccionado);
    window.location.href = `/usuario/html/perfilduenio.html?id=${idPedidoSeleccionado}`; //cambio de pantalla y le paso el id
}

let pedidosCargados = [];

function cargarPedidos() {
    fetch("https://print-me-ten.vercel.app/pedidos/pedidos")
        .then(response => response.json())
        .then(data => {
            console.log("Data recibida:", data);
            if (Array.isArray(data)) {
                pedidosCargados = data; 
                data.forEach(crearPedido); 
            } else {
                console.error("El dato recibido no es un array:", data);
            }
        })
        .catch(error => console.error("Error al cargar pedidos:", error));
}
/*
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
*/

//ruta pediddoById  https://print-me-ten.vercel.app/pedidos/pedidosID/14 

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
