// ====================
// MISSION SECTION - 3D TILT & ANIMATIONS
// ====================

class MissionSection {
  constructor() {
    this.featureCards = document.querySelectorAll('.feature-card');
    this.statItems = document.querySelectorAll('.stat-item');
    this.observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    };
    
    this.init();
  }
  
  init() {
    // Initialize 3D Tilt Effect
    this.featureCards.forEach(card => {
      this.init3DTilt(card);
    });
    
    // Initialize Statistics Counter
    this.initStatisticsCounter();
    
    // Initialize Fade-in Animations
    this.initFadeInAnimations();
  }
  
  // 3D Tilt Effect on Mouse Move
  init3DTilt(card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-10px)
        scale3d(1.02, 1.02, 1.02)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale3d(1, 1, 1)';
    });
  }
  
  // Statistics Counter with Intersection Observer
  initStatisticsCounter() {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counting');
          this.animateCounter(entry.target);
          entry.target.classList.add('counted');
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, this.observerOptions);
    
    this.statItems.forEach(item => {
      observer.observe(item);
    });
  }
  
  // Animate Number Counter
  animateCounter(statItem) {
    const numberElement = statItem.querySelector('.stat-number');
    const targetText = numberElement.textContent;
    const targetNumber = parseInt(targetText.replace(/\D/g, ''));
    const suffix = targetText.replace(/[0-9]/g, '');
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentNumber = Math.round(targetNumber * this.easeOutQuad(progress));
      
      numberElement.textContent = currentNumber + suffix;
      
      if (frame >= totalFrames) {
        clearInterval(counter);
        numberElement.textContent = targetText;
      }
    }, frameDuration);
  }
  
  // Easing function for smooth animation
  easeOutQuad(t) {
    return t * (2 - t);
  }
  
  // Fade-in Animations with Intersection Observer
  initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2,
      rootMargin: '0px'
    });
    
    fadeElements.forEach(element => {
      observer.observe(element);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const missionSection = document.querySelector('.mission-section');
  if (missionSection) {
    new MissionSection();
  }
});
