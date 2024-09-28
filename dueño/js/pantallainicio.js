document.addEventListener('DOMContentLoaded', function () {
  // Manejador para el ícono del menú
  const menuIcon = document.getElementById('menu-icon');
  const buttonContainer = document.querySelector('.button-container');

  // Alternar el menú al hacer clic en el ícono
  menuIcon.addEventListener('click', function () {
      buttonContainer.classList.toggle('show-menu');
  });

  // Cierra el menú si se hace clic fuera de él
  document.addEventListener('click', function (event) {
      if (!buttonContainer.contains(event.target) && !menuIcon.contains(event.target)) {
          buttonContainer.classList.remove('show-menu');
      }
  });


});
 