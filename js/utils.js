// ====================
// UTILITY FUNCTIONS
// ====================

class Utils {
  constructor() {
    this.backToTopBtn = document.querySelector('.back-to-top');
    this.init();
  }
  
  init() {
    this.initSmoothScroll();
    this.initBackToTop();
    this.initNewsletterForm();
  }
  
  // Smooth Scroll for Navigation Links
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        // Don't prevent default for empty hash
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 100; // Offset for fixed navbar
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const navbarLinks = document.querySelector('.navbar-links');
          const menuToggle = document.querySelector('.menu-toggle');
          if (navbarLinks && navbarLinks.classList.contains('active')) {
            navbarLinks.classList.remove('active');
            menuToggle.classList.remove('active');
          }
        }
      });
    });
  }
  
  // Back to Top Button
  initBackToTop() {
    if (!this.backToTopBtn) return;
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        this.backToTopBtn.classList.add('visible');
      } else {
        this.backToTopBtn.classList.remove('visible');
      }
    });
    
    // Scroll to top on click
    this.backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Newsletter Form Submission
  initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const input = form.querySelector('.newsletter-input');
      const email = input.value.trim();
      
      if (this.validateEmail(email)) {
        // Placeholder for actual newsletter subscription logic
        this.showNotification('Thanks for subscribing! 🎉', 'success');
        input.value = '';
      } else {
        this.showNotification('Please enter a valid email address', 'error');
      }
    });
  }
  
  // Email Validation
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Show Notification
  showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 30px;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
      color: white;
      border-radius: 8px;
      font-weight: 500;
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Utils();
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
});
