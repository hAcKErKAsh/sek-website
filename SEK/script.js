// DOM Elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const contactForm = document.getElementById('contactForm');
const bookServiceBtn = document.getElementById('bookServiceBtn');
const scrollToTopBtn = document.createElement('button');

// Initialize scroll to top button
scrollToTopBtn.id = 'scrollToTop';
scrollToTopBtn.innerHTML = '↑';
document.body.appendChild(scrollToTopBtn);

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu after clicking
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
});

// Book Service Function
function bookService(serviceName) {
  const message = `Hello, I would like to book the service: ${serviceName}`;
  const whatsappUrl = `https://wa.me/917904091790?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// Book Service Button (Hero Section)
bookServiceBtn.addEventListener('click', () => {
  const message = "Hello, I would like to book a service.";
  const whatsappUrl = `https://wa.me/917904091790?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !phone || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  const whatsappMessage = `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`;
  const whatsappUrl = `https://wa.me/917904091790?text=${encodeURIComponent(whatsappMessage)}`;

  window.open(whatsappUrl, '_blank');

  // Reset form
  contactForm.reset();
});

// Scroll to Top Functionality
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .gallery-grid img, .about-image img').forEach(el => {
  observer.observe(el);
});

// Header Background Change on Scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(30, 60, 114, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
    header.style.backdropFilter = 'none';
  }
});

// Typing Effect for Hero Title (Optional Enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Apply typing effect to hero title
const heroTitle = document.querySelector('#hero h1');
if (heroTitle) {
  const originalText = heroTitle.textContent;
  heroTitle.textContent = '';
  setTimeout(() => {
    typeWriter(heroTitle, originalText);
  }, 500);
}

// Service Card Hover Effects
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-15px) rotate(1deg)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotate(0deg)';
  });
});

// Gallery Image Lightbox (Simple)
document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <img src="${img.src}" alt="${img.alt}" style="width: 100%; max-height: 80vh; object-fit: contain;">
      </div>
    `;
    document.body.appendChild(modal);

    modal.style.display = 'block';

    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.removeChild(modal);
      }
    });
  });
});

// Form Validation Enhancement
document.querySelectorAll('input, textarea').forEach(field => {
  field.addEventListener('blur', () => {
    if (field.hasAttribute('required') && !field.value.trim()) {
      field.style.borderColor = '#ff6b6b';
    } else {
      field.style.borderColor = '#e1e5e9';
    }
  });

  field.addEventListener('input', () => {
    if (field.value.trim()) {
      field.style.borderColor = '#1e3c72';
    }
  });
});

// Preload Images for Better Performance
function preloadImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      const image = new Image();
      image.src = src;
    }
  });
}

window.addEventListener('load', preloadImages);

// Analytics-like Event Tracking (Console Log for Demo)
function trackEvent(eventName, details) {
  console.log(`Event: ${eventName}`, details);
}

document.querySelectorAll('.service-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    trackEvent('Service Booked', { service: btn.previousElementSibling.textContent });
  });
});

contactForm.addEventListener('submit', () => {
  trackEvent('Contact Form Submitted', { form: 'contact' });
});
