import { templates } from '../settings.js';
// import { utils } from '../utils.js';

class AboutPage {
  constructor(element) {
    this.render(element);
  }

  render(wrapper) {
    const generatedHTML = templates.aboutPage();
    this.dom = {};
    this.dom.wrapper = wrapper;
    console.log('wrapper: ', wrapper);
    this.dom.wrapper.innerHTML = generatedHTML;
    console.log('generatedHTML: ', this.dom.wrapper.innerHTML);
  }
}

export default AboutPage;
