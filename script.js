(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  const setHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 30);
  };
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }));
  }

  document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  const allProducts = Array.isArray(window.KKGT_PRODUCTS) ? window.KKGT_PRODUCTS : [];
  const productGrid = document.querySelector('#product-grid');

  if (productGrid && allProducts.length) {
    const search = document.querySelector('#product-search');
    const count = document.querySelector('#product-count');
    const filterBtns = [...document.querySelectorAll('[data-filter]')];
    let activeFilter = new URLSearchParams(location.search).get('category') || 'All';
    const normalize = s => String(s || '').toLowerCase().trim();

    function productCard(p) {
      return `<article class="product-card">
        <div class="product-mark"><span>KKGT · ${p.category.toUpperCase()}</span><strong>${p.name}</strong></div>
        <div class="product-card-category">${p.category.toUpperCase()}</div>
        <h3>${p.name}</h3>
        <p>${p.subtitle || 'KKGT crop-protection portfolio'}</p>
        <a href="product.html?id=${encodeURIComponent(p.id)}">View verified details ↗</a>
      </article>`;
    }

    function render() {
      const q = normalize(search?.value);
      const visible = allProducts.filter(p => {
        const matchesFilter = activeFilter === 'All' || p.category === activeFilter;
        const matchesSearch = !q || normalize(p.name).includes(q) || normalize(p.category).includes(q);
        return matchesFilter && matchesSearch;
      });
      productGrid.innerHTML = visible.map(productCard).join('') || '<p>No matching products found.</p>';
      if (count) count.textContent = String(visible.length);
      filterBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === activeFilter));
    }

    filterBtns.forEach(btn => btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      history.replaceState({}, '', activeFilter === 'All' ? 'products.html' : `products.html?category=${encodeURIComponent(activeFilter)}`);
      render();
    }));
    document.querySelectorAll('[data-jump-filter]').forEach(btn => btn.addEventListener('click', () => {
      activeFilter = btn.dataset.jumpFilter;
      document.querySelector('.catalogue')?.scrollIntoView({ behavior: 'smooth' });
      render();
    }));
    search?.addEventListener('input', render);
    if (!['All', 'Fungicide', 'Herbicide', 'Insecticide', 'Crop Protection'].includes(activeFilter)) activeFilter = 'All';
    render();
  }

  const detailName = document.querySelector('#product-name');
  if (detailName && allProducts.length) {
    const id = new URLSearchParams(location.search).get('id');
    const p = allProducts.find(x => x.id === id) || allProducts[0];
    const set = (sel, val) => {
      const el = document.querySelector(sel);
      if (el && val) el.textContent = val;
    };
    set('#product-name', p.name);
    set('#visual-name', p.name);
    set('#product-category', p.category);
    set('#product-subtitle', p.subtitle);
    set('#fact-name', p.name);
    set('#fact-category', p.category);
    set('#product-verified-note', p.verified);
    document.title = `${p.name} | KKGT Agrochemicals`;
    const inquiry = document.querySelector('#product-inquiry');
    if (inquiry) inquiry.href = `contact.html?interest=${encodeURIComponent(p.name)}`;
    if (p.active) {
      document.querySelector('#fact-active-row')?.removeAttribute('hidden');
      set('#fact-active', p.active);
    }
    if (p.formulation) {
      document.querySelector('#fact-formulation-row')?.removeAttribute('hidden');
      set('#fact-formulation', p.formulation);
    }
  }

  const inquiryForm = document.querySelector('[data-inquiry-form]');
  if (inquiryForm) {
    const interest = new URLSearchParams(location.search).get('interest');
    if (interest) {
      const select = inquiryForm.elements.interest;
      const normalized = interest.toLowerCase();
      const mapping = [
        ['coffee', 'Ethiopian Coffee'], ['yirgacheffe', 'Ethiopian Coffee'], ['sidama', 'Ethiopian Coffee'], ['limmu', 'Ethiopian Coffee'], ['jimma', 'Ethiopian Coffee'], ['lekempti', 'Ethiopian Coffee'],
        ['commodities', 'Agricultural Commodities'], ['sesame', 'Agricultural Commodities'], ['soybeans', 'Agricultural Commodities'], ['pulses', 'Agricultural Commodities'], ['beans', 'Agricultural Commodities'],
        ['agro', 'Agrochemicals'], ['harmony', 'Agrochemicals'], ['horozeb', 'Agrochemicals'], ['range', 'Agrochemicals'], ['agroban', 'Agrochemicals'],
        ['stationery', 'Stationery'], ['construction', 'Construction Materials'], ['trading', 'General Trading']
      ];
      const found = mapping.find(([key]) => normalized.includes(key));
      if (found && select) select.value = found[1];
      if (!found && select && allProducts.some(p => p.name.toLowerCase() === normalized)) select.value = 'Agrochemicals';
    }

    inquiryForm.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(inquiryForm);
      const subject = `KKGT ${fd.get('interest')} Inquiry`;
      const body = [
        `Name: ${fd.get('name')}`,
        `Company: ${fd.get('company') || '-'}`,
        `Email: ${fd.get('email')}`,
        `Phone / WhatsApp: ${fd.get('phone') || '-'}`,
        `Business area: ${fd.get('interest')}`,
        '',
        'Requirement:',
        fd.get('message')
      ].join('\n');
      const status = inquiryForm.querySelector('.form-status');
      if (status) status.textContent = 'Opening your email app with the inquiry prepared…';
      location.href = `mailto:info@kkgtimportexport.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();