document.addEventListener('DOMContentLoaded', () => {
  // --- Prevent automatic scroll restoration ---
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  // --- Constants & Variables ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const themeToggle = document.querySelector('.theme-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const sections = document.querySelectorAll('section');
  const yearSpan = document.getElementById('year');
  const typeTextElement = document.getElementById('typewriter-text');

  // --- Mobile Menu Logic ---
  const toggleMenu = () => {
    if (!navMenu || !navToggle) return;
    const isOpen = navMenu.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    if (icon) {
      icon.classList.remove(isOpen ? 'fa-bars' : 'fa-times');
      icon.classList.add(isOpen ? 'fa-times' : 'fa-bars');
    }
    // Update ARIA state on the toggle button
    navToggle.setAttribute('aria-expanded', String(isOpen));
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          toggleMenu(); // Close menu on click
        }
      });
    });
  }

  // --- Theme Logic ---
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  };

  const updateThemeIcon = (theme) => {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
      icon.classList.replace('fa-moon', 'fa-sun');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
    }
  };

  // Initialize Theme
  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  // --- Typewriter Effect ---
  const phrases = ["Developer", "Student", "Tech Enthusiast", "Quick Learner"];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typeTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; 
    } else {
      typeTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before next word
    }

    setTimeout(typeWriter, typeSpeed);
  }
  
  // Start typewriter if element exists
  if (typeTextElement) typeWriter();

  // --- Scroll Animation (Reveal) ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach((el, i) => {
    // stagger entrance for a polished feel
    el.style.transitionDelay = `${i * 120}ms`;
    revealObserver.observe(el);
  });

  // --- Active Link Highlight & Back To Top ---
  // Use a passive scroll listener for performance
  const onScroll = () => {
    const scrollY = window.scrollY;

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scroll Spy (Highlight active nav link)
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= (sectionTop - 150)) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.hash === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Back to Top functionality
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Dynamic Year ---
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
