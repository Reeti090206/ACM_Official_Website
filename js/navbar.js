// ====================
// NAVBAR FUNCTIONALITY
// ====================

class Navbar {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.navbarLinks = document.querySelector('.navbar-links');
    this.links = document.querySelectorAll('.navbar-links a');
    
    this.init();
  }
  
  init() {
    // Scroll effect
    window.addEventListener('scroll', () => this.handleScroll());
    
    // Mobile menu toggle
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', () => this.toggleMenu());
    }
    
    // Close menu when link is clicked
    this.links.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navbar.contains(e.target) && this.navbarLinks.classList.contains('active')) {
        this.closeMenu();
      }
    });
  }
  
  handleScroll() {
    if (window.scrollY > 100) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }
  
  toggleMenu() {
    this.menuToggle.classList.toggle('active');
    this.navbarLinks.classList.toggle('active');
  }
  
  closeMenu() {
    this.menuToggle.classList.remove('active');
    this.navbarLinks.classList.remove('active');
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Navbar();
});
