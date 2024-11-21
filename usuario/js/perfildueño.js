const idPerfil = localStorage.getItem('perfilSeleccionado');
console.log(idPerfil); 

  if (idPerfil) {

    fetch(`https://print-me-ten.vercel.app/vendedores/vendedorByID/${idPerfil}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('nombre').textContent = data.Nombre_apellido;
        document.getElementById('desc').textContent = data.descripcion;
        document.getElementById('impresora-info').textContent = data.impresora;
        document.getElementById('filamento-info').textContent = data.filamento; 
        document.getElementById('start-order').value = data.numero_telefonico; 

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
