// ========================================
// MODERN PORTFOLIO JAVASCRIPT
// ========================================

// ========================================
// NAVIGATION & SCROLL
// ========================================

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
  });

  // Close menu when link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.style.display = 'none';
    });
  });
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========================================
// GALLERY FUNCTIONALITY
// ========================================

function currentSlide(n, dotElement) {
  const card = dotElement.closest('.project-card');
  const images = card.querySelectorAll('.gallery-image');
  const dots = card.querySelectorAll('.dot');
  
  images.forEach(img => img.style.display = 'none');
  dots.forEach(dot => dot.classList.remove('active'));
  
  if (images[n]) {
    images[n].style.display = 'block';
    dotElement.classList.add('active');
  }
}

function nextSlide(button) {
  const card = button.closest('.project-card');
  const images = card.querySelectorAll('.gallery-image');
  const dots = card.querySelectorAll('.dot');
  let currentIndex = 0;
  
  images.forEach((img, index) => {
    if (img.style.display !== 'none') {
      currentIndex = index;
    }
  });
  
  let nextIndex = (currentIndex + 1) % images.length;
  currentSlide(nextIndex, dots[nextIndex]);
}

function prevSlide(button) {
  const card = button.closest('.project-card');
  const images = card.querySelectorAll('.gallery-image');
  const dots = card.querySelectorAll('.dot');
  let currentIndex = 0;
  
  images.forEach((img, index) => {
    if (img.style.display !== 'none') {
      currentIndex = index;
    }
  });
  
  let prevIndex = (currentIndex - 1 + images.length) % images.length;
  currentSlide(prevIndex, dots[prevIndex]);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery-next').forEach(btn => {
    btn.addEventListener('click', () => nextSlide(btn));
  });
  
  document.querySelectorAll('.gallery-prev').forEach(btn => {
    btn.addEventListener('click', () => prevSlide(btn));
  });
});

// ========================================
// PROJECT FILTER
// ========================================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    projectCards.forEach(card => {
      if (filterValue === 'all') {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.6s ease-out';
      } else {
        const cardCategory = card.getAttribute('data-category');
        if (cardCategory === filterValue) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.6s ease-out';
        } else {
          card.style.display = 'none';
        }
      }
    });
  });
});

// ========================================
// CONTACT FORM
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validate form
    if (!name || !email || !subject || !message) {
      showNotification('يرجى ملء جميع الحقول', 'error');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
      return;
    }

    // Create mailto link
    const mailtoLink = `mailto:abdulmalikalbohiri@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`الاسم: ${name}\nالبريد الإلكتروني: ${email}\n\n${message}`)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    showNotification('تم إرسال رسالتك بنجاح! شكراً لك', 'success');

    // Reset form
    contactForm.reset();
  });
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideInLeft 0.3s ease-out reverse';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
  observer.observe(card);
});

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// ACTIVE NAVIGATION LINK
// ========================================

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================

function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 16);
}

// Animate stats when they come into view
const statCards = document.querySelectorAll('.stat-card h3');
let statsAnimated = false;

window.addEventListener('scroll', () => {
  if (!statsAnimated) {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
      const rect = statsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        statCards.forEach(card => {
          const value = parseInt(card.textContent);
          animateCounter(card, value);
        });
        statsAnimated = true;
      }
    }
  }
});

// ========================================
// LAZY LOADING FOR IMAGES
// ========================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========================================
// DARK MODE TOGGLE (Optional)
// ========================================

const darkModeToggle = document.querySelector('.dark-mode-toggle');
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });

  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
}

// ========================================
// PARALLAX EFFECT
// ========================================

window.addEventListener('scroll', () => {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  parallaxElements.forEach(element => {
    const scrollPosition = window.pageYOffset;
    const elementOffset = element.offsetTop;
    const distance = scrollPosition - elementOffset;
    element.style.transform = `translateY(${distance * 0.5}px)`;
  });
});

// ========================================
// FORM VALIDATION
// ========================================

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ========================================
// INITIALIZE
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio loaded successfully!');

  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';

  // Initialize animations
  const elements = document.querySelectorAll('[data-animate]');
  elements.forEach((el, index) => {
    el.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
  });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Use throttle for scroll events
window.addEventListener('scroll', throttle(() => {
  // Your scroll logic here
}, 100));
