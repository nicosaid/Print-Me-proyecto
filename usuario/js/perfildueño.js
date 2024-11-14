let clienteId = localStorage.getItem('LoginId'); // Recupera el id guardado en localStorage
let numeroTelefono;

document.addEventListener("DOMContentLoaded", function() {
  //funcion para buscar el nombre segun el id que lleve el producto (que es el mismo que el del cliente)
  const urlParams = new URLSearchParams(window.location.search);
  const idPerfilSeleccionado = urlParams.get('id'); 

  if (idPerfilSeleccionado) {
        fetch(`https://print-me-ten.vercel.app/vendedores/vendedorByID/${idPerfilSeleccionado}`)
            .then(response => response.json())
            .then(data => {
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
                document.getElementById('filamento-info').textContent  = vendedor.impresora_materiales || "Filamento no especificado";
                
            })
            .catch(error => console.error('Error al obtener los datos:', error));
    } else {
                    console.error('No se encontró un ID en la URL');
    }
    
});
    function abrirWhatsApp()
    { 
        
        if (!numeroTelefono) {
            console.error("El número de teléfono no está disponible");
            return;
        }
    const mensaje = "Hola, quiero coordinar el servicio de impresión 3D. Mi pedido ya ha sido realizado por la web, miralo y aceptalo en la pagina de PrintMe"
    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`; 
    window.open(url, '_blank'); 
    } 


    
  function crearProducto() {
    
    // Si no se encuentran el clienteId, muestra un mensaje de error y termina la función
    if (!clienteId ) {
        alert("No se encontró información de usuario. Por favor, inicie sesión.");
        return;
    }

    const nuevoProducto = {
      producto: "producto",
      clienteId : clienteId ,
    };

    const token = localStorage.getItem("token");
    if (!token) {
        console.log("No se encontró el token.");
        return; // Si no hay token, detener la ejecución
    }
    
    fetch('https://print-me-ten.vercel.app/pedido/createpedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(nuevoProducto)  // Convierte los datos a formato JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto creado:', data);  
        alert("Producto creado con éxito");
    })
    .catch(error => {
        console.error('Error al crear el producto:', error);
        alert("Hubo un error al crear el producto");
    });
}

// RUTA TODOS PEDIDOS https://print-me-ten.vercel.app/pedidos/pedidos

//a mi frid en el pedido me pasa un id (tiene que estar en la ruta de todos los pedidos), yo con ese id entro a la tabla de compradores, y busco el nombre, despues muestro el nombre en el div junto al boton aceptar/rechazar.