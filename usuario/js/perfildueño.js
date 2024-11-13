function abrirWhatsApp()
      { 
      const numero = "1234567890"; // Reemplaza con el número de teléfono al que quieres enviar el mensaje 
      const mensaje = "Hola!"; // Reemplaza con tu mensaje 
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`; window.open(url, '_blank'); 
      } 

/*
document.addEventListener("DOMContentLoaded", function() {
        const expandables = document.querySelectorAll(".expandable");
        expandables.forEach(function(expandable) {
          expandable.addEventListener("click", function() {
            this.classList.toggle("active"); // Alterna la clase 'active'
          });
        });
      });
*/
localStorage.setItem('perfilSeleccionado', '1');
localStorage.getItem('perfilSeleccionado');

document.addEventListener("DOMContentLoaded", function() {
  const idPerfil = localStorage.getItem('perfilSeleccionado');
  console.log(idPerfil); 
  if (idPerfil) {
        fetch(`http://print-me1.vercel.app/vendedores/vendedorByID/${idPerfil}`)
            .then(response => response.json())
            .then(data => {
              console.log(data);
                // Asigna los datos a los elementos correspondientes
                document.getElementById('nombre').textContent = data.Nombre_apellido;
                document.getElementById('imagen').src = data.imagen;
                document.getElementById('desc').textContent = data.descripcion;
                document.getElementById('impresora-info').textContent = data.impresora;
                document.getElementById('filamento-info').textContent = data.filamento;

                //localStorage.removeItem('perfilSeleccionado');
            })
  } else {
                console.error('No se encontró un perfil seleccionado.');
  }
  });

  