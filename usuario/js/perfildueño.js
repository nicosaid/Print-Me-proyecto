// Obtén el token e ID del localStorage
const token = localStorage.getItem('token');
const id = localStorage.getItem('LoginId');
console.log("Token actual:", token);
console.log("ID actual:", LoginId);

if (id) {
    // Hacer una petición al backend para obtener los datos
    fetch(`https://print-me-ten.vercel.app/vendedores/vendedorByID/${LoginId}`) // Reemplaza con tu URL
      .then(response => response.json())
      .then(data => {
        // Rellenar los campos con los datos obtenidos
        document.getElementById('nombre-apellido').value = data.nombre_apellido || '';
        document.getElementById('description-input').value = data.descripcion || '';
        document.getElementById('email-input').value = data.mail || '';
        document.getElementById('zona').value = data.zona || '';
        document.getElementById('impresora-input').value = data.impresora_modelo || '';
        document.getElementById('filamento-input').value = data.impresora_materiales || '';
  
        // Configurar el radio button según el valor de post_procesado
        if (data.post_procesado) {
          document.getElementById('postSi').checked = true; // Selecciona "Sí"
        } else {
          document.getElementById('postNo').checked = true; // Selecciona "No"
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  } else {
    console.error('No se encontró id en localStorage.');
  }

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
    
    if (!token) {
        alert("Porfavor, inicia sesion. Redirigiendo al inicio de sesión...");
        // Redirige o maneja la falta del token
        window.location.href = '/general/html/sesion.html';
    } else {
        console.log("Token encontrado:", token);
    }

    const nuevoProducto = {
      producto: "producto",
    };

    
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