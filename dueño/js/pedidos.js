document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado");
    cargarPedidos();
});

let pedidosPendientes = [];
let pedidosAceptados = [];

function cargarPedidos() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token no encontrado en localStorage.");
        return;
    }

    fetch("https://print-me-ten.vercel.app/pedidos/pedidos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            // Procesar cada pedido individualmente
            data.forEach(pedido => {
                const idComprador = pedido.id_comprador;

                fetch(`https://print-me-ten.vercel.app/compradores/compradorByID/${idComprador}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(response => response.json())
                .then(compradorData => {
                    const nombreComprador = compradorData.comprador
                        ? compradorData.comprador.nombre_apellido
                        : "Sin nombre";

                    // Guardar los pedidos en el arreglo de pendientes
                    pedidosPendientes.push({ pedido, nombreComprador });
                    crearPedido(pedido, nombreComprador, "Pendiente");
                })
                .catch(error => console.error("Error al obtener comprador:", error));
            });
        } else {
            document.getElementById("Pendientes").innerHTML = "<p>No se encontraron pedidos.</p>";
        }
    })
    .catch(error => console.error("Error al cargar pedidos:", error));
}

function crearPedido(pedido, nombreComprador, estado) {
    const pedidoDiv = document.createElement("div");
    pedidoDiv.classList.add("card");
    pedidoDiv.setAttribute("data-id", pedido.id);
    pedidoDiv.setAttribute("data-estado", estado);

    pedidoDiv.innerHTML = `
        <img src="../fotos/impresora 3d.png" alt="Impresora" class="printer-image">
        <div class="info">
            <h2>${nombreComprador}</h2>
            <button class="aceptar" onclick="aceptarPedido(${pedido.id})">Aceptar</button>
            <button class="rechazar" onclick="rechazarPedido(${pedido.id})">Rechazar</button>
        </div>
    `;

    // Agregar el pedido a la sección correspondiente
    if (estado === "Pendiente") {
        document.getElementById("Pendientes").appendChild(pedidoDiv);
    } else if (estado === "Aceptado") {
        document.getElementById("Aceptados").appendChild(pedidoDiv);
    }
}

function aceptarPedido(id) {
    const pedidoDiv = document.querySelector(`.card[data-id="${id}"]`);
    if (!pedidoDiv) return;

    // Cambiar el estado del pedido a Aceptado
    pedidoDiv.setAttribute("data-estado", "Aceptado");

    // Mover el pedido de pendientes a aceptados
    document.getElementById("Pendientes").removeChild(pedidoDiv);
    document.getElementById("Aceptados").appendChild(pedidoDiv);

    // Actualizar el arreglo de pedidos
    const pedidoIndex = pedidosPendientes.findIndex(pedido => pedido.pedido.id === id);
    if (pedidoIndex !== -1) {
        pedidosAceptados.push(pedidosPendientes[pedidoIndex]);
        pedidosPendientes.splice(pedidoIndex, 1);
    }
}

function rechazarPedido(id) {
    const pedidoDiv = document.querySelector(`.card[data-id="${id}"]`);
    if (!pedidoDiv) return;

    // Eliminar el pedido del DOM
    pedidoDiv.remove();

    // Eliminar el pedido de los pendientes
    const pedidoIndex = pedidosPendientes.findIndex(pedido => pedido.pedido.id === id);
    if (pedidoIndex !== -1) {
        pedidosPendientes.splice(pedidoIndex, 1);
    }
}

function mostrarPendientes() {
    const pendientes = document.getElementById("Pendientes");
    const aceptados = document.getElementById("Aceptados");

    pendientes.style.display = "block";
    aceptados.style.display = "none";

    // Cambiar la clase activa
    document.getElementById("MostrarPendientes").classList.add("active");
    document.querySelector("[onclick='mostrarAceptados()']").classList.remove("active");
}

function mostrarAceptados() {
    const pendientes = document.getElementById("Pendientes");
    const aceptados = document.getElementById("Aceptados");

    pendientes.style.display = "none";
    aceptados.style.display = "block";

    // Cambiar la clase activa
    document.getElementById("MostrarPendientes").classList.remove("active");
    document.querySelector("[onclick='mostrarAceptados()']").classList.add("active");
}

// Función para mostrar el popup de filtrado (opcional)
function openPopup() {
    console.log("Abrir popup para filtrar pedidos...");
}

//boton aceptar y rechazar DESDE EL BACK
/*
function aceptarPedido(idPedido) {
    console.log(`Intentando aceptar el pedido con ID: ${idPedido}`);

    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token no encontrado en localStorage.");
        alert("Por favor, inicia sesión nuevamente.");
        return;
    }

    fetch(`https://print-me-ten.vercel.app/pedidos/${idPedido}/aceptar`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ estado: "aceptado" })
    })
    .then(response => {
        console.log("Respuesta del servidor:", response.status, response.statusText);
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(errorData => {
                console.error("Detalles del error:", errorData);
                alert(`Error: ${errorData.message || "No se pudo aceptar el pedido."}`);
            });
        }
    })
    .then(data => {
        if (data) {
            console.log("Pedido aceptado exitosamente:", data);
            alert("Pedido aceptado.");
            // cultar el pedido de la UI
            const pedidoElement = document.querySelector(`.card[data-id="${idPedido}"]`);
            if (pedidoElement) pedidoElement.style.display = "none";
        }
    })
    .catch(error => {
        console.error("Error inesperado:", error);
        alert("Hubo un error inesperado al aceptar el pedido.");
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
*/
//FILTROS

