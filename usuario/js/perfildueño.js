function abrirWhatsApp()
      { 
      const numero = "1234567890"; // Reemplaza con el número de teléfono al que quieres enviar el mensaje 
      const mensaje = "Hola!"; // Reemplaza con tu mensaje 
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`; window.open(url, '_blank'); 
      } 
    
document.addEventListener("DOMContentLoaded", function() {
        const expandables = document.querySelectorAll(".expandable");
        expandables.forEach(function(expandable) {
          expandable.addEventListener("click", function() {
            this.classList.toggle("active"); // Alterna la clase 'active'
          });
        });
      });