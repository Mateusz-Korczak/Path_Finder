import { templates } from '../settings.js';

class AboutPage {
  constructor(element) {
    this.render(element);
  }

  render(wrapper) {
    const generatedHTML = templates.aboutPage();
    this.dom = {};
    this.dom.wrapper = wrapper;
    this.dom.wrapper.innerHTML = generatedHTML;
  }
}

export default AboutPage;
