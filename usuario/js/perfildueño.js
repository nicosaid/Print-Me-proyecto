function abrirWhatsApp()
{ 
// const numero = "1234567890"; // Reemplaza con el número de teléfono al que quieres enviar el mensaje 
const numero = document.getElementById('start-order').value; 
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
        fetch(`https://print-me-ten.vercel.app/vendedores/vendedorByID/${idPerfil}`)
            .then(response => response.json())
            .then(data => {
              console.log(data);
                // Asigna los datos a los elementos correspondientes
                document.getElementById('nombre').textContent = data.Nombre_apellido;
                document.getElementById('desc').textContent = data.descripcion;
                document.getElementById('impresora-info').textContent = data.impresora;
                document.getElementById('filamento-info').textContent = data.filamento; 
                document.getElementById('start-order').value = data.numero_telefonico; 

                //localStorage.removeItem('perfilSeleccionado');
            })
  } else {
                console.error('No se encontró un perfil seleccionado.');
  }
  });

  