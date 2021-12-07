import { select, classNames } from './settings.js';
import AboutPage from './components/AboutPage.js';
import FinderPage from './components/FinderPage.js';

const app = {
  initFinderPage: function () {
    this.finderPage = document.querySelector(select.containerOf.finderPage);
    this.finderPageObj = new FinderPage(this.finderPage);
  },
  initAboutPage: function () {
    this.aboutPage = document.querySelector(select.containerOf.aboutPage);
    this.aboutPageObj = new AboutPage(this.aboutPage);
  },
  getElements: function () {
    this.pages = document.querySelector(select.containerOf.pages).children;
    this.navLinks = document.querySelectorAll(select.nav.links);
  },

  activatePage: function (pageId) {
    for (let page of this.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for (let link of this.navLinks) {
      link.classList.toggle(
        classNames.pages.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initPages: function () {
    const idFromHash = window.location.hash.replace('#/', '');
    let pageMatchingHash = this.pages[0].id;
    for (let page of this.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    this.activatePage(pageMatchingHash);
    for (let link of this.navLinks) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const id = this.getAttribute('href').replace('#', '');

        this.activatePage(id);
        window.location.hash = '#' + id;
      });
    }
  },

  init: function () {
    this.initAboutPage();
    this.initFinderPage();
    this.getElements();
    this.initPages();
  },
};

app.init();
