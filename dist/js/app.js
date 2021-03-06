/* global AOS */

import { select, classNames } from './settings.js';
import AboutPage from './components/AboutPage.js';
import Finder from './components/Finder.js';

const app = {
  initFinderPage: function () {
    this.finderPage = document.querySelector(select.containerOf.finderPage);
    this.finderPageObj = new Finder(this.finderPage);
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
    let pageMatchingHash = this.pages[1].id;
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

        app.activatePage(id);
        window.location.hash = '#' + id;
      });
    }
  },

  init: function () {
    this.initAboutPage();
    this.initFinderPage();
    this.getElements();
    this.initPages();

    AOS.init();
  },
};

app.init();
