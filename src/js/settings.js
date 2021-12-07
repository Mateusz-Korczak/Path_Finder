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
};
export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
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
