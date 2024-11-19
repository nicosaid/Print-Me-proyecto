document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado");
    cargarPedidos();
});

let pedidosCargados = [];

function cargarPedidos() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token no encontrado en localStorage.");
        return; // Sal de la función si no hay token
    }

    fetch("https://print-me-ten.vercel.app/pedidos/pedidos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Token en formato Bearer
        }
    })
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                data.forEach(pedido => {
                    let idComprador = pedido.id_comprador;
                    if (idComprador) {
                        fetch(`https://print-me-ten.vercel.app/compradores/compradorByID/${idComprador}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}` // Asegúrate de que el token también se pasa aquí si es necesario
                            }
                        })
                            .then(response => response.json())
                            .then(compradorData => {
                                const nombreComprador = compradorData.comprador ? compradorData.comprador.nombre_apellido : "Sin nombre";
                                crearPedido(pedido, nombreComprador);
                                console.log("ID del comprador:", idComprador);
                            })
                            .catch(error => console.error("Error al obtener comprador:", error));
                    } else {
                        console.error("Pedido sin ID de comprador:", pedido);
                    }
                });
            } else {
                document.getElementById("TodosPedidos").innerHTML = "<p>No se encontraron pedidos.</p>";
            }
        })
        .catch(error => console.error("Error al cargar pedidos:", error));
}

function crearPedido(pedido, nombreComprador) {
    console.log("pedido:",pedido, "Nombre del comprador:", nombreComprador);

    // Crear un div contenedor para cada perfil
    const pedidoDiv = document.createElement("div");
    pedidoDiv.classList.add("card");//clase del css

    pedidoDiv.innerHTML = `
        <img src="../fotos/impresora 3d.png" alt="Impresora" class="printer-image">
        <h2>${nombreComprador}</h2>
        <button class="aceptar"  onclick="aceptarPedido(${pedido.id})">
                       Aceptar
                            <path
                                fill-rule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
        </button>
        <button class="rechazar"  onclick="rechazarPedido(${pedido.id})">
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

//boton aceptar y rechazar

function aceptarPedido(id) {
    console.log(`Aceptando pedido con ID: ${id}`);
    const token = localStorage.getItem("token");

    fetch(`https://print-me-ten.vercel.app/pedidos/${id}/aceptar`, {
        method: "PUT", // Método PUT para actualizar
        headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            estado: "aceptado"
        })
    })
        .then(response => {
            if (response.ok) {
                console.log(`Pedido ${id} aceptado exitosamente`);
                alert(`El pedido ${id} fue aceptado.`);
            } else {
                console.error(`Error al aceptar el pedido ${id}:`, response.statusText);
                response.json().then(data => {
                    console.error("Detalles del error:", data); // Mostrar detalles del error
                });
                alert(`Hubo un problema al aceptar el pedido ${id}.`);
            }
        })
        .catch(error => {
            console.error(`Error en la solicitud para aceptar pedido ${id}:`, error);
            alert(`Hubo un error al intentar aceptar el pedido ${id}.`);
        });
}
function rechazarPedido(idPedido) {
    console.log(`Rechazando pedido con ID: ${idPedido}`);
    
    fetch(`https://print-me-ten.vercel.app/pedidos/delete/${idPedido}`, {
        method: "DELETE", // Método DELETE para eliminar el pedido
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: idPedido }) 
    })
        .then(response => {
            if (response.ok) {
                console.log(`Pedido ${idPedido} rechazado exitosamente`);
                alert(`El pedido ${idPedido} fue rechazado.`);
                // Opcional: eliminar el pedido del DOM si fue rechazado con éxito
                const pedidoElement = document.querySelector(`.card[data-id="${idPedido}"]`);
                if (pedidoElement) {
                    pedidoElement.remove();
                }
            } else {
                console.error(`Error al rechazar el pedido ${idPedido}:`, response.statusText);
                alert(`Hubo un problema al rechazar el pedido ${idPedido}.`);
            }
        })
        .catch(error => console.error(`Error en la solicitud para rechazar pedido ${idPedido}:`, error));
}

//funcion para redirigir pagina segun id pedido
function MoverID(idPedidoSeleccionado){
    console.log("idPedidoSeleccionado:", idPedidoSeleccionado);
    window.location.href = `/usuario/html/perfilduenio.html?id=${idPedidoSeleccionado}`; //cambio de pantalla y le paso el id
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
