const menuButton = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const blankLightboxImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

if (lightboxImage && !lightboxImage.getAttribute('src')) {
  lightboxImage.src = blankLightboxImage;
}

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

function openLightbox(src, caption) {
  if (!lightbox || !lightboxImage) return;

  lightboxImage.src = src;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  lightboxImage.src = blankLightboxImage;
}

document.querySelectorAll('[data-lightbox-src]').forEach((button) => {
  button.addEventListener('click', () => {
    const src = button.dataset.lightboxSrc;
    const caption = button.dataset.lightboxCaption || button.querySelector('img')?.alt || '';
    openLightbox(src, caption);
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

const menuCatalog = document.querySelector('[data-menu-catalog]');

function createMenuCard(item) {
  const card = document.createElement('article');
  card.className = 'menu-card';
  card.innerHTML = `
    <img src="${item.image}" alt="${item.alt}">
    <div class="menu-card-body">
      <div class="menu-card-top">
        <h3>${item.name}</h3>
        <span class="price">${item.price}</span>
      </div>
      <p>${item.description}</p>
    </div>
  `;
  return card;
}

function renderMenu() {
  if (!menuCatalog || !window.camposMenu) return;

  window.camposMenu.forEach((category) => {
    const section = document.createElement('section');
    section.className = 'menu-category';
    section.id = category.id;

    const heading = document.createElement('div');
    heading.className = 'menu-category-head';
    heading.innerHTML = `
      <p class="section-kicker">${category.kicker}</p>
      <h2>${category.name}</h2>
      <p>${category.description}</p>
    `;

    const grid = document.createElement('div');
    grid.className = 'menu-card-grid';
    category.items.forEach((item) => grid.appendChild(createMenuCard(item)));

    section.appendChild(heading);
    section.appendChild(grid);
    menuCatalog.appendChild(section);
  });
}

renderMenu();
