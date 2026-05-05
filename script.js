// ===== TUC Designs LLC — Interactivity =====

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  const themeToggle = document.getElementById('themeToggle');
  const mouseTracer = document.getElementById('mouseTracer');
  const customCursor = document.getElementById('customCursor');

  // Mouse Tracer Logic
  let mouseX = 0, mouseY = 0;
  let tracerX = 0, tracerY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateTracer = () => {
    // Smooth lerp (linear interpolation) for the glow
    tracerX += (mouseX - tracerX) * 0.05;
    tracerY += (mouseY - tracerY) * 0.05;
    
    // Snappier lerp for the small dot
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;

    if (mouseTracer) {
      mouseTracer.style.left = `${tracerX}px`;
      mouseTracer.style.top = `${tracerY}px`;
    }
    if (customCursor) {
      customCursor.style.left = `${cursorX}px`;
      customCursor.style.top = `${cursorY}px`;
    }
    
    requestAnimationFrame(animateTracer);
  };
  animateTracer();

  // Interactive scale on links
  document.querySelectorAll('a, button, .char').forEach(el => {
    el.addEventListener('mouseenter', () => {
      mouseTracer.classList.add('active');
      customCursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    });
    el.addEventListener('mouseleave', () => {
      mouseTracer.classList.remove('active');
      customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });

  // --- Hero Text Character Splitting ---
  const heroHeadline = document.getElementById('heroHeadline');
  if (heroHeadline) {
    const text = heroHeadline.textContent;
    heroHeadline.textContent = '';
    
    [...text].forEach(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'char';
      heroHeadline.appendChild(span);
    });
  }

  // Theme Toggle Logic
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('svg');
    if (theme === 'light') {
      icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'; // Moon
    } else {
      icon.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>'; // Sun
    }
  }

  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Hamburger toggle ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const updateActive = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  };
  window.addEventListener('scroll', updateActive, { passive: true });

  // --- Scroll reveal with Intersection Observer ---
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // --- Stagger children inside reveal containers ---
  document.querySelectorAll('.services-grid .reveal, .portfolio-grid .reveal, .testimonials-grid .reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });

});
