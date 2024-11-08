const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const stars = [];

// Crear la estrella con destellos, halo y animación de parpadeo
class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1 + 0.5; // Tamaño más pequeño (de 0.5 a 1.5)
        this.haloRadius = this.radius * 6; // Halo ajustado
        this.brightness = Math.random() * 0.7 + 0.6; // Ajustar brillo
        this.baseBrightness = this.brightness; // Brillo base para la animación
        this.twinkleSpeed = Math.random() * 0.05 + 0.01; // Velocidad de parpadeo
        this.angleOffset = Math.random() * Math.PI * 2; // Desfase de animación
        this.dx = (Math.random() - 0.5) * 0.5; // Velocidad en X
        this.dy = (Math.random() - 0.5) * 0.5; // Velocidad en Y
    }

    update() {
        // Actualizar el brillo para dar un efecto de parpadeo suave
        this.brightness = this.baseBrightness + Math.sin(Date.now() * this.twinkleSpeed + this.angleOffset) * 0.2;

        // Mover la estrella
        this.x += this.dx;
        this.y += this.dy;

        // Rebotar las estrellas al llegar a los bordes del canvas
        if (this.x < 0 || this.x > canvas.width) {
            this.dx *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.dy *= -1;
        }
    }

    draw() {
        // Dibujar el halo
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
            this.x, this.y, this.radius, this.x, this.y, this.haloRadius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.brightness})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // Dibujar la estrella central
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}

// Crear muchas estrellas
function createStars() {
    for (let i = 0; i < 100; i++) { // Cambiado a 100 estrellas
        stars.push(new Star());
    }
}

// Dibujar y actualizar las estrellas
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();  // Actualiza el brillo para el parpadeo
        star.draw();    // Dibuja la estrella
    });
}

function animate() {
    drawStars();
    requestAnimationFrame(animate);  // Animar continuamente
}

createStars();
animate();
