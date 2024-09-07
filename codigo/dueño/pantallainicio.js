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

  // Función para filtrar elementos por categoría
  function filterItems(category) {
      var items = document.querySelectorAll('.items .item');
      
      items.forEach(function(item) {
          if (category === 'Todos') {
              item.style.display = 'block';
          } else {
              if (item.classList.contains(category)) {
                  item.style.display = 'block';
              } else {
                  item.style.display = 'none';
              }
          }
      });
  }

  // Mostrar todos los elementos al cargar la página
  filterItems('Todos');
});
