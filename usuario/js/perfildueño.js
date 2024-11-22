function getPerfilIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");  // Obtiene el valor de 'id' de la URL
}

const idPerfil = getPerfilIdFromUrl();

  if (!idPerfil) {
    console.error("No se encontró el ID del perfil en la URL");
  } else {
    console.log("ID del perfil obtenido:", idPerfil);
    cargarDatosPerfil(idPerfil);
  }

  function cargarDatosPerfil(id) {
    fetch(`https://print-me-ten.vercel.app/vendedores/vendedorByID/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos del perfil");
        }
        return response.json();
      })
      .then(data => {
        const vendedor = data.vendedor;

        if (!vendedor) {
          throw new Error("No se encontró el vendedor en la respuesta");
        }
  
        console.log("Datos del vendedor:", vendedor);
  
        const nombreElemento = document.getElementById('nombre');
        const descElemento = document.getElementById('desc');
        const impresoraInfo = document.getElementById('impresora-info');
        const filamentoInfo = document.getElementById('filamento-info');
        numeroTelefono = vendedor.numero_telefonico;
  
        if (nombreElemento) nombreElemento.textContent = vendedor.nombre_apellido || "Sin nombre";
        if (descElemento) descElemento.textContent = vendedor.descripcion || "Sin descripción";
        if (impresoraInfo) impresoraInfo.textContent = vendedor.impresora_modelo || "Sin modelo";
        if (filamentoInfo) filamentoInfo.textContent = vendedor.impresora_materiales || "Sin materiales";
      })
      .catch(error => {
        console.error("Error al cargar los datos del perfil:", error);
      });
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
    const token = localStorage.getItem('token');
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