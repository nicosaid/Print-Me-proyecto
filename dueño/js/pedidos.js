document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado");
    cargarPedidos();
});

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
                            console.log("Respuesta del endpoint compradorByID:", compradorData);

                            const nombreComprador = compradorData.comprador
                                ? compradorData.comprador.nombre_apellido
                                : "Sin nombre";

                            crearPedido(pedido, nombreComprador);
                        })
                        .catch(error => console.error("Error al obtener comprador:", error));
                });
            } else {
                document.getElementById("TodosPedidos").innerHTML = "<p>No se encontraron pedidos.</p>";
            }
        })
        .catch(error => console.error("Error al cargar pedidos:", error));
}

function crearPedido(pedido, nombreComprador) {
    console.log("Creando pedido:", pedido, "Nombre del comprador:", nombreComprador);

    const pedidoDiv = document.createElement("div");
    pedidoDiv.classList.add("card");
    pedidoDiv.setAttribute("data-id", pedido.id);

    pedidoDiv.innerHTML = `
        <img src="../fotos/impresora 3d.png" alt="Impresora" class="printer-image">
        <div class="info">
            <h2>${nombreComprador}</h2>
            <button class="aceptar" onclick="aceptarPedido(${pedido.id})">Aceptar</button>
            <button class="rechazar" onclick="rechazarPedido(${pedido.id})">Rechazar</button>
        </div>
    `;

    document.getElementById("TodosPedidos").appendChild(pedidoDiv);
}

//boton aceptar y rechazar

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

//FILTROS

