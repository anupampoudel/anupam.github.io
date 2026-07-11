// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// ===== Animated status-card counters (hero signature element) =====
const counters = document.querySelectorAll('[data-counter]');
const animateCounter = (el) => {
  const target = parseFloat(el.dataset.counter);
  const suffix = el.dataset.suffix || '';
  const isDecimal = target % 1 !== 0;
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = (isDecimal ? value.toFixed(2) : Math.round(value)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
};

if (counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(el => counterObserver.observe(el));
}

// ===== Scroll-reveal for section content =====
const revealTargets = document.querySelectorAll(
  '.skill-group, .cert-card, .project-card, .timeline-item, .edu-card, .gallery-item'
);
if (revealTargets.length) {
  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));
}

// ===== Contact form (front-end only placeholder) =====
// NOTE: This form does not send email yet. To make it functional, connect it
// to a service like Formspree (formspree.io) or EmailJS (emailjs.com):
//   1. Sign up and get a form endpoint / public key.
//   2. Replace the code below with a fetch() POST to that endpoint,
//      or follow the provider's snippet.
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!contactForm.checkValidity()) {
    formStatus.textContent = 'Please fill in all fields with a valid email.';
    return;
  }
  formStatus.textContent = 'Thanks for reaching out — this form isn\'t connected to email yet. Please contact me directly at hello@anupams.site in the meantime.';
  contactForm.reset();
});

// ===== Footer year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
