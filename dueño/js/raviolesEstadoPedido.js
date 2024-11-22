document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress-bar .bar');
    const estados = ['aceptado', 'enproceso', 'finalizado', 'entregado']; // Define los estados
    const pedidoId = 123; // Reemplaza con el ID real del pedido, si es dinámico puedes obtenerlo de otro modo.
  
    progressBars.forEach((bar, index) => {
      bar.addEventListener('click', () => {
        // Actualizar visualmente las barras
        progressBars.forEach((b, i) => {
          b.classList.toggle('green', i <= index);
          b.classList.toggle('gray', i > index);
        });
  
        // Estado correspondiente a la barra clickeada
        const estado = estados[index];
        console.log(`Estado seleccionado: ${estado}`);
  
        // Enviar el nuevo estado al backend
        actualizarEstadoPedido(pedidoId, estado)
          .then(() => {
            console.log(`Estado actualizado en la base de datos: ${estado}`);
          })
          .catch((error) => {
            console.error('Error al actualizar el estado:', error);
          });
      });
    });
  });
  
  // Función para realizar la petición al backend
  async function actualizarEstadoPedido(pedidoId, estado) {
    const ruta = `https://tu-backend.com/pedidos/${pedidoId}/estado`; // Ajusta la ruta
    const respuesta = await fetch(ruta, {
      method: 'PUT', // O el método correspondiente (POST/PATCH)
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado }),
    });
  
    if (!respuesta.ok) {
      throw new Error('Error en la petición al servidor');
    }
  
    return respuesta.json(); // Si necesitas manejar la respuesta del servidor
  }
  