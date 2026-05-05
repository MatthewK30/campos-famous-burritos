const menuButton = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const tabs = document.querySelectorAll('[data-menu-tab]');
const panels = document.querySelectorAll('[data-menu-panel]');
const galleryButtons = document.querySelectorAll('[data-lightbox-src]');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('is-open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
    });
  });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.menuTab;

    tabs.forEach((button) => {
      button.classList.toggle('is-active', button === tab);
      button.setAttribute('aria-selected', String(button === tab));
    });

    panels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.menuPanel === target);
    });
  });
});

galleryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const src = button.dataset.lightboxSrc;
    const caption = button.dataset.lightboxCaption || button.querySelector('img')?.alt || '';

    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = src;
    lightboxImage.alt = caption;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    lightboxClose?.focus();
  });
});

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  lightboxImage.removeAttribute('src');
}

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});
