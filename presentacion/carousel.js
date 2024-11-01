let currentSlide = 0; // Índice de la diapositiva actual

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        slide.classList.remove('active'); // Quitar la clase activa de todas las diapositivas
        if (i === index) {
            slide.classList.add('active'); // Agregar la clase activa a la diapositiva correspondiente
        }
    });
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    currentSlide += direction; // Cambiar el índice de la diapositiva
    if (currentSlide < 0) {
        currentSlide = slides.length - 1; // Volver al final si está en la primera
    } else if (currentSlide >= slides.length) {
        currentSlide = 0; // Volver al principio si está al final
    }
    showSlide(currentSlide); // Mostrar la diapositiva actual
}

// Inicializar el carrusel mostrando la primera diapositiva
showSlide(currentSlide);
