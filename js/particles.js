// ====================
// PARTICLE SYSTEM
// ====================

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 80;
    this.connectionDistance = 150;
    this.mouse = { x: null, y: null, radius: 100 };
    
    this.init();
  }
  
  init() {
    this.resize();
    this.createParticles();
    this.animate();
    
    // Event Listeners
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles(); // Recreate particles on resize
    });
    
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
    
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }
  
  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    
    // Adjust particle count based on screen size
    const area = this.canvas.width * this.canvas.height;
    this.particleCount = Math.floor(area / 15000); // Adjust density
    this.particleCount = Math.max(30, Math.min(100, this.particleCount)); // Min 30, Max 100
  }
  
  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }
  }
  
  drawParticle(particle) {
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
    this.ctx.fill();
    
    // Add glow effect
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
  }
  
  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.connectionDistance) {
          const opacity = 1 - (distance / this.connectionDistance);
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.2})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }
  
  updateParticles() {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Mouse interaction
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          particle.x -= dx * force * 0.05;
          particle.y -= dy * force * 0.05;
        }
      }
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.vx *= -1;
        particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.vy *= -1;
        particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
      }
    });
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawConnections();
    this.particles.forEach(particle => this.drawParticle(particle));
    this.updateParticles();
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const particleCanvas = document.getElementById('particles-canvas');
  if (particleCanvas) {
    new ParticleSystem('particles-canvas');
  }
});
