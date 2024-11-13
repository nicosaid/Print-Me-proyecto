let numeroTelefono = "";
document.addEventListener("DOMContentLoaded", function() {

  localStorage.getItem('perfilSeleccionado');

  const idPerfil = localStorage.getItem('perfilSeleccionado');
  console.log(idPerfil); 

  //funcion para buscar el nombre segun el id que lleve el producto

  if (idPerfil) {
        fetch(`https://print-me-ten.vercel.app/vendedores/vendedorByID/${idPerfil}`)
            .then(response => response.json())
            .then(data => {
              console.log(data);
                // Asigna los datos a los elementos correspondientes
                document.getElementById('nombre').textContent = data.Nombre_apellido;
            })
  } else {
                console.error('No se encontró un nombre segun el id');
  }
  });

  function abrirWhatsApp()
  { 
  // const numero = "1234567890"; // Reemplaza con el número de teléfono al que quieres enviar el mensaje 
  const mensaje = "Hola, quiero coordinar el servicio de impresión 3D. Mi pedido ya ha sido realizado por la web, miralo y aceptalo en la pagina de PrintMe"
  const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`; window.open(url, '_blank'); 

  } 
    
  function crearProducto() {
    
    const clienteId = localStorage.getItem('clienteId');

    // Si no se encuentran el clienteId, muestra un mensaje de error y termina la función
    if (!clienteId) {
        alert("No se encontró información de usuario. Por favor, inicie sesión.");
        return;
    }

    const nuevoProducto = {
      producto: producto,
      id: id,
    };

    fetch('https://print-me-ten.vercel.app/pedido/createpedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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