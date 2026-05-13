/* ============================================================
   LEVISHA MALVIYA — Global Scripts
   ============================================================ */

(function () {
  'use strict';

  /* ---- Navigation ---- */
  const nav        = document.querySelector('.nav');
  const burger     = document.querySelector('.nav__burger');
  const mobileMenu = document.querySelector('.nav__mobile');
  const isHero     = nav && nav.dataset.hero === 'true';

  function updateNav() {
    if (!nav) return;
    const scrolled = window.scrollY > 60;
    nav.classList.toggle('scrolled', scrolled);
    if (isHero) {
      nav.classList.toggle('transparent', !scrolled);
    }
  }

  if (nav) {
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
  }

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      burger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      })
    );
  }

  /* Mark active nav link */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- Scroll Reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  }

  /* ---- Project Filter (portfolio page) ---- */
  const filterBtns = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('[data-category]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.style.opacity = match ? '1' : '0.25';
          card.style.pointerEvents = match ? '' : 'none';
          card.style.transform = match ? 'scale(1)' : 'scale(0.97)';
        });
      });
    });
  }

  /* ---- Contact Form ---- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Message Sent';
      btn.disabled = true;
      btn.style.opacity = '0.6';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        btn.style.opacity = '';
        form.reset();
      }, 3000);
    });
  }

  /* ---- Cursor line on hero ---- */
  const cursor = document.querySelector('.hero-cursor');
  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
    });
  }

  /* ---- Smooth number counter (admin) ---- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }
  document.querySelectorAll('[data-target]').forEach(el => {
    const io2 = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCounter(el);
        io2.disconnect();
      }
    });
    io2.observe(el);
  });

})();
