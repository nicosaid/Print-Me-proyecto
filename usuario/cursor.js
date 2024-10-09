const cursor = document.getElementById('cursor');
const cursorCircle = document.querySelector('.cursor-circle');

document.addEventListener('mousemove', (e) => {
    // Actualiza la posición del cursor según la posición del mouse
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';

    // Efecto gooey en el cursor
    cursorCircle.style.transform = `scale(1.1)`;
});

document.addEventListener('mouseleave', () => {
    // Reinicia la escala al salir del área del documento
    cursorCircle.style.transform = `scale(1)`;
});
