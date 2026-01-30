// ====================
// FAQ ACCORDION
// ====================

class FAQSection {
  constructor() {
    this.faqItems = document.querySelectorAll('.faq-item');
    this.init();
  }
  
  init() {
    this.faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        this.toggleFAQ(item);
      });
    });
    
    // Initialize scroll animations
    this.initScrollAnimations();
  }
  
  toggleFAQ(item) {
    const isActive = item.classList.contains('active');
    
    // Close all other FAQs (accordion behavior)
    this.faqItems.forEach(faq => {
      faq.classList.remove('active');
      const answer = faq.querySelector('.faq-answer');
      answer.style.maxHeight = null;
    });
    
    // Toggle current FAQ
    if (!isActive) {
      item.classList.add('active');
      const answer = item.querySelector('.faq-answer');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  }
  
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
        }
      });
    }, observerOptions);
    
    this.faqItems.forEach(item => {
      observer.observe(item);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const faqSection = document.querySelector('.faq-section');
  if (faqSection) {
    new FAQSection();
  }
});
