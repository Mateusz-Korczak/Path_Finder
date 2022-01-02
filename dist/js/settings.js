export const select = {
  templateOf: {
    aboutPage: '#template-about-page',
    finderPage: '#template-finder-page',
  },
  containerOf: {
    pages: '#pages',
    aboutPage: '.about-wrapper',
    finderPage: '.finder-wrapper',
  },
  nav: {
    links: '.navbar-nav a',
  },
  finder: {
    grid: '.grid',
    submitBtn: '.btn-finder',
  },
};
export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  },
  finder: {
    field: 'field',
    active: 'active',
    start: 'start',
    finish: 'finish',
    path: 'path',
  },
};
export const templates = {
  aboutPage: Handlebars.compile(
    document.querySelector(select.templateOf.aboutPage).innerHTML
  ),
  finderPage: Handlebars.compile(
    document.querySelector(select.templateOf.finderPage).innerHTML
  ),
};
