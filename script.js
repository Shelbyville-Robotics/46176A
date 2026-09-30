"use strict";

// Every feature enhances content that already works without JavaScript.
function initNavigation() {
    const nav = document.querySelector('.navbar');
    const toggle = document.querySelector('.menu-toggle');
    const links = document.getElementById('nav-links');
    if (!nav || !toggle || !links) return;
    nav.classList.add('nav-enhanced');
    function closeMenu() {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('is-open');
    }
    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', String(expanded));
        links.classList.toggle('is-open', expanded);
    });
    links.addEventListener('click', event => {
        if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            toggle.focus();
        }
    });
    document.addEventListener('click', event => {
        if (!nav.contains(event.target)) closeMenu();
    });
    window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
}

function initReveals() {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || !('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
    targets.forEach(target => {
        // Initial viewport content is never gated by an observer callback.
        if (target.getBoundingClientRect().top < window.innerHeight - 20) return;
        target.classList.add('reveal', 'reveal-pending');
        target.style.setProperty('--reveal-delay', (Number(target.dataset.reveal) || 0) + 'ms');
        observer.observe(target);
    });
    motion.addEventListener('change', () => {
        if (!motion.matches) return;
        observer.disconnect();
        targets.forEach(target => target.classList.add('is-visible'));
    });
    document.addEventListener('focusin', event => {
        const target = event.target.closest('.reveal-pending');
        if (target) {
            target.classList.add('is-visible');
            observer.unobserve(target);
        }
    });
}

function initArchive() {
    const search = document.getElementById('doc-search');
    const category = document.getElementById('doc-category');
    const type = document.getElementById('doc-type');
    const reset = document.getElementById('doc-reset');
    const count = document.getElementById('doc-count');
    const empty = document.getElementById('doc-empty');
    if (!search || !category || !type || !reset || !count || !empty) return;
    const cards = [...document.querySelectorAll('.doc-card')];
    const normalise = value => value.toLowerCase().replace(/[_./-]+/g, ' ').replace(/\s+/g, ' ').trim();
    function applyFilters() {
        const terms = normalise(search.value).split(' ').filter(Boolean);
        let visible = 0;
        cards.forEach(card => {
            const matches = terms.every(term => card.dataset.search.includes(term))
                && (!category.value || card.dataset.category === category.value)
                && (!type.value || card.dataset.type === type.value);
            card.hidden = !matches;
            if (matches) visible++;
        });
        count.textContent = visible + ' of ' + cards.length + ' archive files';
        empty.hidden = visible !== 0;
        reset.disabled = !search.value && !category.value && !type.value;
    }
    search.addEventListener('input', applyFilters);
    category.addEventListener('change', applyFilters);
    type.addEventListener('change', applyFilters);
    reset.addEventListener('click', () => {
        search.value = '';
        category.value = '';
        type.value = '';
        applyFilters();
        search.focus();
    });
    document.querySelector('.archive-toolbar').hidden = false;
    reset.hidden = false;
    applyFilters();
}

function initGallery() {
    const dialog = document.getElementById('photo-dialog');
    if (!dialog || typeof dialog.showModal !== 'function') return;
    const items = [...document.querySelectorAll('.gallery-item')];
    if (!items.length) return;
    const image = document.getElementById('lightbox-image');
    const title = document.getElementById('photo-title');
    const position = document.getElementById('photo-position');
    let index = 0;
    let opener;
    function showImage(next) {
        index = (next + items.length) % items.length;
        image.src = items[index].href;
        image.alt = items[index].querySelector('img').alt;
        title.textContent = items[index].dataset.caption;
        position.textContent = (index + 1) + ' / ' + items.length;
    }
    items.forEach((item, next) => {
        item.addEventListener('click', event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            opener = item;
            showImage(next);
            dialog.showModal();
        });
    });
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-previous]').addEventListener('click', () => showImage(index - 1));
    dialog.querySelector('[data-next]').addEventListener('click', () => showImage(index + 1));
    dialog.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            showImage(index + (event.key === 'ArrowRight' ? 1 : -1));
        }
    });
    dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
        image.removeAttribute('src');
        opener?.focus();
    });
}

function initBootSequence() {
    const dialog = document.getElementById('boot-dialog');
    const trigger = document.getElementById('boot-trigger');
    if (!dialog || !trigger || typeof dialog.showModal !== 'function') return;
    trigger.hidden = false;
    trigger.addEventListener('click', () => dialog.showModal());
    dialog.querySelectorAll('[data-close]').forEach(button => {
        button.addEventListener('click', () => dialog.close());
    });
    dialog.addEventListener('close', () => trigger.focus());
}

function init() {
    // Isolate enhancements so one optional feature cannot break another page.
    [initNavigation, initArchive, initGallery, initBootSequence, initReveals].forEach(enhance => {
        try { enhance(); } catch (error) { console.error('Could not initialise ' + enhance.name + ':', error); }
    });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
else init();
