// DOM Elements
const body = document.body;
const navbar = document.querySelector('.navbar');
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const themeToggles = document.querySelectorAll('.theme-toggle');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const currentYearElement = document.getElementById('current-year');
const backToTopLink = document.querySelector('.back-to-top');

// Set current year in footer
currentYearElement.textContent = new Date().getFullYear();

// Check if user prefers dark mode
function getPreferredTheme() {
  // Check localStorage first
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme;
  }
  
  // Check system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply theme
function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    body.classList.remove('light');
  } else {
    body.classList.add('light');
    body.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
}

// Initialize theme
applyTheme(getPreferredTheme());

// Toggle mobile menu
menuButton.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', !isExpanded);
  mobileNav.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
  });
});

// Toggle theme
themeToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.getAttribute('href') === '#') return;
    
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for navbar height
        behavior: 'smooth'
      });
    }
  });
});

// Back to top functionality
backToTopLink.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Add focus styles for keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    body.classList.add('keyboard-user');
  }
});

// Remove focus styles for mouse users
document.addEventListener('mousedown', () => {
  body.classList.remove('keyboard-user');
});

// Enhance accessibility for timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.classList.add('focused');
      setTimeout(() => {
        item.classList.remove('focused');
      }, 300);
    }
  });
});

// Add animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.card, .timeline-item, .skill-card, .certification-card');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight * 0.9) {
      element.classList.add('animate-in');
    }
  });
};

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Ensure images are loaded
window.addEventListener('load', () => {
  document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }
  });
});