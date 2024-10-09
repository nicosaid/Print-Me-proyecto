const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor() {
      this.reset();
    }
  
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.speed = Math.random() / 5 + 0.1;
      this.opacity = 1;
      this.fadeStart = Date.now() + Math.random() * 600 + 100;
      this.fadingOut = false;
    }
  
    update() {
      this.y -= this.speed;
      if (this.y < 0 || (this.fadingOut && (this.opacity -= 0.008) <= 0)) {
        this.reset();
      }
      if (!this.fadingOut && Date.now() > this.fadeStart) {
        this.fadingOut = true;
      }
    }
  
    draw() {
      // Cambia el tamaño de las estrellas aquí
      const size = Math.random() * 3 + 2; // Aumentar el rango de tamaño
      ctx.fillStyle = `rgba(${255 - (Math.random() * 127.5)}, 255, 255, ${this.opacity})`;
      ctx.fillRect(this.x, this.y, size, size); // Cambia el tamaño
    }
  }
  

function initParticles() {
  particles = Array.from({ length: Math.floor((canvas.width * canvas.height) / 6000) }, () => new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animate();
