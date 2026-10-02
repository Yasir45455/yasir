(() => {
  const root = document.documentElement;
  root.classList.add('js');

  // Header: add a surface once the page scrolls
  const header = document.querySelector('[data-navbar]');
  const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  // Theme toggle (initial theme is applied in js/tailwind-config.js)
  const themeButtons = document.querySelectorAll('[data-theme-toggle]');
  const syncThemeButtons = () => themeButtons.forEach(b => b.setAttribute('aria-pressed', String(root.classList.contains('dark'))));
  syncThemeButtons();
  themeButtons.forEach(btn => btn.addEventListener('click', () => {
    const dark = root.classList.toggle('dark');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) { /* ignore */ }
    syncThemeButtons();
  }));

  // Desktop dropdowns (Services mega menu, About menu): click, hover and keyboard friendly
  const dropdowns = [...document.querySelectorAll('[data-dropdown]')].map(wrap => ({
    wrap,
    toggle: wrap.querySelector('[data-dropdown-toggle]'),
    panel: wrap.querySelector('[data-dropdown-panel]'),
    timer: 0,
    hoverAt: 0
  }));
  const setOpen = (dd, open) => {
    clearTimeout(dd.timer);
    dd.panel.dataset.open = String(open);
    dd.toggle.setAttribute('aria-expanded', String(open));
  };
  const closeAll = (except) => dropdowns.forEach(dd => dd !== except && setOpen(dd, false));
  dropdowns.forEach(dd => {
    dd.toggle.addEventListener('click', () => {
      if (Date.now() - dd.hoverAt < 500) return; // hover just opened it; don't toggle it shut
      const open = dd.panel.dataset.open !== 'true'; closeAll(dd); setOpen(dd, open); });
    dd.wrap.addEventListener('mouseenter', () => { if (matchMedia('(hover: hover)').matches) { dd.hoverAt = Date.now(); closeAll(dd); setOpen(dd, true); } });
    dd.wrap.addEventListener('mouseleave', () => { if (matchMedia('(hover: hover)').matches) dd.timer = setTimeout(() => setOpen(dd, false), 150); });
    dd.wrap.addEventListener('focusout', e => { if (!dd.wrap.contains(e.relatedTarget)) setOpen(dd, false); });
  });
  document.addEventListener('click', e => dropdowns.forEach(dd => { if (!dd.wrap.contains(e.target)) setOpen(dd, false); }));

  // Mobile menu
  const mobileBtn = document.querySelector('[data-mobile-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const setMobile = (open) => {
    if (!mobileBtn || !mobileMenu) return;
    mobileMenu.classList.toggle('hidden', !open);
    mobileBtn.setAttribute('aria-expanded', String(open));
    mobileBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileBtn.querySelector('[data-icon-open]')?.classList.toggle('hidden', open);
    mobileBtn.querySelector('[data-icon-close]')?.classList.toggle('hidden', !open);
  };
  mobileBtn?.addEventListener('click', () => setMobile(mobileMenu.classList.contains('hidden')));
  document.querySelectorAll('[data-accordion-toggle]').forEach(btn => btn.addEventListener('click', () => {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    const open = panel.classList.toggle('hidden') === false;
    btn.setAttribute('aria-expanded', String(open));
  }));
  matchMedia('(min-width: 1024px)').addEventListener('change', e => e.matches && setMobile(false));

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const openDd = dropdowns.find(dd => dd.panel.dataset.open === 'true');
    if (openDd) { setOpen(openDd, false); openDd.toggle.focus(); }
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) { setMobile(false); mobileBtn.focus(); }
  });

  // FAQ accordions
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('button');
    btn?.addEventListener('click', () => {
      const open = item.dataset.open !== 'true';
      item.dataset.open = String(open);
      btn.setAttribute('aria-expanded', String(open));
      item.querySelector('.faq-answer')?.classList.toggle('hidden', !open);
    });
  });

  // Scroll reveal
  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .1 });
    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('is-visible'));
  }

  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  window.lucide?.createIcons();
})();
