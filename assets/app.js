(() => {
  const focusableSelector = 'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])';

  const lockScroll = (lock) => document.body.classList.toggle('no-scroll', lock);

  const trapFocus = (container, event) => {
    const nodes = [...container.querySelectorAll(focusableSelector)];
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  document.querySelectorAll('.lang').forEach((lang) => {
    const button = lang.querySelector('.lang-btn');
    button?.addEventListener('click', () => lang.classList.toggle('open'));
    document.addEventListener('click', (event) => {
      if (!lang.contains(event.target)) lang.classList.remove('open');
    });
  });

  const drawer = document.querySelector('.drawer');
  const burger = document.querySelector('.burger');
  const closeDrawer = document.querySelector('.drawer-close');
  const panel = drawer?.querySelector('.drawer-panel');

  const setDrawer = (open) => {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    lockScroll(open);
    if (open) panel?.querySelector(focusableSelector)?.focus();
  };

  burger?.addEventListener('click', () => setDrawer(true));
  closeDrawer?.addEventListener('click', () => setDrawer(false));
  drawer?.addEventListener('click', (event) => {
    if (event.target === drawer) setDrawer(false);
  });

  const modal = document.querySelector('.modal');
  const openModal = document.querySelectorAll('[data-open-privacy]');
  const closeModal = document.querySelectorAll('[data-close-privacy]');
  const modalCard = modal?.querySelector('.modal-card');

  const setModal = (open) => {
    if (!modal) return;
    modal.classList.toggle('open', open);
    lockScroll(open);
    if (open) modalCard?.querySelector(focusableSelector)?.focus();
  };

  openModal.forEach((trigger) => trigger.addEventListener('click', (event) => {
    event.preventDefault();
    setModal(true);
  }));
  closeModal.forEach((trigger) => trigger.addEventListener('click', () => setModal(false)));
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) setModal(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setDrawer(false);
      setModal(false);
    }
    if (event.key === 'Tab') {
      if (drawer?.classList.contains('open') && panel) trapFocus(panel, event);
      if (modal?.classList.contains('open') && modalCard) trapFocus(modalCard, event);
    }
  });

  document.querySelectorAll('.faq-item').forEach((item) => {
    const button = item.querySelector('.faq-q');
    button?.addEventListener('click', () => {
      document.querySelectorAll('.faq-item').forEach((other) => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
})();
