import { templates } from '../settings.js';

class FinderPage {
  constructor(element) {
    this.render(element);
  }

  render(wrapper) {
    const generatedHTML = templates.finderPage();
    wrapper.innerHTML = generatedHTML;
  }
}

export default FinderPage;
