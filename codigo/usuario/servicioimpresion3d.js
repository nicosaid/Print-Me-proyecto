const perfilesDueños = document.querySelectorAll('.perfilesdueños');
const detalledueño = document.querySelector('#detalle-dueños');

perfilesDueños.forEach((cardProduct) => {
    perfilDueño.addEventListener('click', () => {
        // Get the product details from the card
        const titulo = perfilDueño.querySelector('h3').textContent;
        const descripcion = 'Descripción del producto...'; // Add the product description
        const imagen = perfilDueño.querySelector('img').src;

        // Display the product details
        detalleDueño.style.display = 'block';
        document.querySelector('#titulo-detalle').textContent = titulo;
        document.querySelector('#descripcion-detalle').textContent = descripcion;
        document.querySelector('#imagen-detalle').src = imagen;
    });
});
const perfilDueños = document.querySelectorAll('.perfilDueño');
const detalleProducto = document.querySelector('#detalle-producto');

perfilDueños.forEach((perfilDueño) => {
    perfilDueño.addEventListener('click', () => {
        // Get the profile details from the card
        const nombre = perfilDueño.querySelector('h3').textContent;
        const imagen = perfilDueño.querySelector('img').src;
        const rating = perfilDueño.querySelector('.stars').innerHTML;

        // Display the profile details
        detalleProducto.style.display = 'block';
        document.querySelector('#titulo-detalle').textContent = nombre;
        document.querySelector('#imagen-detalle').src = imagen;
        document.querySelector('#rating-detalle').innerHTML = rating;
    });
});