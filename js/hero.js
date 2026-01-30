// ====================
// HERO SECTION INTERACTIONS
// ====================

class HeroSection {
  constructor() {
    this.digitalSphere = document.querySelector('.digital-sphere');
    this.typewriterElement = document.querySelector('.typewriter');
    this.scrollIndicator = document.querySelector('.scroll-indicator');
    
    this.init();
  }
  
  init() {
    // Initialize typewriter effect
    if (this.typewriterElement) {
      this.initTypewriter();
    }
    
    // Initialize digital sphere interaction
    if (this.digitalSphere) {
      this.initSphereInteraction();
    }
    
    // Scroll indicator click
    if (this.scrollIndicator) {
      this.scrollIndicator.addEventListener('click', () => {
        document.querySelector('#mission').scrollIntoView({ behavior: 'smooth' });
      });
    }
  }
  
  initTypewriter() {
    const text = this.typewriterElement.getAttribute('data-text') || this.typewriterElement.textContent;
    this.typewriterElement.textContent = '';
    this.typewriterElement.style.width = '0';
    
    let index = 0;
    const speed = 50;
    
    const type = () => {
      if (index < text.length) {
        this.typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        // Remove cursor after typing
        setTimeout(() => {
          this.typewriterElement.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    // Start typing after a delay
    setTimeout(type, 500);
  }
  
  initSphereInteraction() {
    let mouseX = 0;
    let mouseY = 0;
    let sphereX = 0;
    let sphereY = 0;
    
    document.addEventListener('mousemove', (e) => {
      const rect = this.digitalSphere.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX = (e.clientX - centerX) / window.innerWidth;
      mouseY = (e.clientY - centerY) / window.innerHeight;
    });
    
    const animate = () => {
      // Smooth follow
      sphereX += (mouseX - sphereX) * 0.05;
      sphereY += (mouseY - sphereY) * 0.05;
      
      const sphereContainer = this.digitalSphere.querySelector('.sphere-container');
      if (sphereContainer) {
        sphereContainer.style.transform = `
          rotateY(${sphereX * 20}deg) 
          rotateX(${-sphereY * 20}deg)
        `;
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new HeroSection();
});
