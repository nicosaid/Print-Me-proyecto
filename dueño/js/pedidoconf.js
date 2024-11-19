
document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress-bar .bar');
    
    progressBars.forEach((bar, index) => {
        // Asignar un ID único a cada barra si no se ha hecho previamente
        if (!bar.id) {
            bar.id = `bar-${index + 1}`;
        }

        //Codigo para controlar la rutina de inicializacion
        if (bar.classList.contains('green')) {
            console.log(`La barra con id ${bar.id} es verde`);
            // Acción específica para las barras verdes
            if (bar.id === 'bar-1') {
                console.log('Acción para bar-1 cuando es verde');
            } else if (bar.id === 'bar-2') {
                console.log('Acción para bar-2 cuando es verde');
            }
        } else if (bar.classList.contains('gray')) {
            console.log(`La barra con id ${bar.id} es gris`);
            // Acción específica para las barras grises
            if (bar.id === 'bar-3') {
                console.log('Acción para bar-3 cuando es gris');
            } else if (bar.id === 'bar-4') {
                console.log('Acción para bar-4 cuando es gris');
            }
        }

        bar.addEventListener('click', () => {
            // Toggle de colores
            progressBars.forEach((b, i) => {
                b.classList.toggle('green', i <= index);
                b.classList.toggle('gray', i > index);
            });

            // Realizar acciones específicas dependiendo del id
            if (bar.id === 'bar-1') {
                // Acción específica para bar-1
                console.log('Acción para bar-1');
            } else if (bar.id === 'bar-2') {
              // Acción específica para bar-2
                console.log('Acción para bar-2');
            } else if (bar.id === 'bar-3') {
               // Acción específica para bar-3
                console.log('Acción para bar-3');
            } else if (bar.id === 'bar-4') {
                // Acción específica para bar-4
                console.log('Acción para bar-4');
            }
        });
    });
});
