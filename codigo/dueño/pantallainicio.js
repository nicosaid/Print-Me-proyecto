document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const contenedorOpciones = document.querySelector('.contenedor-opciones');

    menuIcon.addEventListener('click', function () {
        contenedorOpciones.classList.toggle('show-menu');
    });

    // Cierra el menú si se hace clic fuera de él
    document.addEventListener('click', function (event) {
        if (!contenedorOpciones.contains(event.target) && !menuIcon.contains(event.target)) {
            contenedorOpciones.classList.remove('show-menu');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const buttonContainer = document.querySelector('.button-container');
  
    menuIcon.addEventListener('click', function () {
      buttonContainer.classList.toggle('show-menu');
    });
  
    document.addEventListener('click', function (event) {
      if (!buttonContainer.contains(event.target) && !menuIcon.contains(event.target)) {
        buttonContainer.classList.remove('show-menu');
      }
    });
  });
  