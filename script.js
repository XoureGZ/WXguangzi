/* ===== Starfield Canvas ===== */
(function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let width, height;
  let mouseX = 0.5;
  let mouseY = 0.5;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createStars();
  }

  function createStars() {
    const count = Math.floor((width * height) / 3500);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.5,
      size: Math.random() * 1.8 + 0.3,
      opacity: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));
  }

  let frame = 0;

  function draw() {
    ctx.clearRect(0, 0, width, height);
    frame++;

    const parallaxX = (mouseX - 0.5) * 20;
    const parallaxY = (mouseY - 0.5) * 20;

    for (const star of stars) {
      const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
      const px = star.x + parallaxX * star.z;
      const py = star.y + parallaxY * star.z;

      const gradient = ctx.createRadialGradient(px, py, 0, px, py, star.size * 2);
      const alpha = star.opacity * twinkle;

      if (star.size > 1.2) {
        gradient.addColorStop(0, `rgba(200, 230, 255, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(0, 229, 255, ${alpha * 0.4})`);
        gradient.addColorStop(1, 'rgba(0, 229, 255, 0)');
      } else {
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }

      ctx.beginPath();
      ctx.arc(px, py, star.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / width;
    mouseY = e.clientY / height;
  });

  resize();
  draw();
})();

/* ===== Header Scroll Effect ===== */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

/* ===== Mobile Nav Toggle ===== */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===== Scroll Reveal ===== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ===== Smooth Active Nav Highlight ===== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach((item) => {
    item.style.color = item.getAttribute('href') === `#${current}`
      ? 'var(--text-primary)'
      : '';
  });
});
