import { classNames, select, templates } from '../settings.js';

class Finder {
  constructor(element) {
    const thisFinder = this;
    // save reference to finder page div
    thisFinder.element = element;
    // start at step 1
    thisFinder.step = 1;
    thisFinder.grid = {};
    for (let row = 1; row <= 10; row++) {
      thisFinder.grid[row] = {};
      for (let col = 1; col <= 10; col++) {
        thisFinder.grid[row][col] = false;
      }
    }
    // render view for the first time
    thisFinder.render();
  }

  toggleField(fieldElem) {
    debugger;
    const thisFinder = this;
    // get row and col info from field elem attrs
    const field = {
      row: fieldElem.getAttribute('data-row'),
      col: fieldElem.getAttribute('data-col'),
    };
    console.log('field: ', field);
    console.log('thisFinder.grid: ', thisFinder.grid);
    // if field with this row and col is true -> unselect it
    if (thisFinder.grid[field.row][field.col]) {
      thisFinder.grid[field.row][field.col] = false;
      fieldElem.classList.remove(classNames.finder.active);
    } else {
      // flatten object to array of values e.g. [false, false, false]
      const gridValues = Object.values(thisFinder.grid)
        .map((col) => Object.values(col))
        .flat();

      // if grid isn't empty...
      console.log('gridValues:', gridValues);
      if (gridValues.includes(true)) {
        console.log('zostal wybrany chociaz jeden field..');
        console.log('field: ', field);
        console.log('thisFinder.grid: ', thisFinder.grid);
        // determine edge fields
        const edgeFields = [];
        if (field.col > 1) {
          edgeFields.push(thisFinder.grid[field.row][field.col - 1]); //get field on the left value
          console.log(
            'thisFinder.grid[field.row][field.col - 1]: ',
            thisFinder.grid[field.row][field.col - 1]
          );
          console.log('edgeFields col > 1: ', edgeFields);
        }
        if (field.col < 10) {
          edgeFields.push(thisFinder.grid[field.row][field.col + 1]); //get field on the right value
          console.log(
            'thisFinder.grid[field.row][field.col + 1]: ',
            thisFinder.grid[field.row][field.col + 1]
          );
          console.log('edgeFields col < 10: ', edgeFields);
        }
        if (field.row > 1) {
          edgeFields.push(thisFinder.grid[field.row - 1][field.col]); //get field on the top value
          console.log(
            'thisFinder.grid[field.row - 1][field.col]: ',
            thisFinder.grid[field.row - 1][field.col]
          );
          console.log('edgeFields row > 1: ', edgeFields);
        }
        if (field.row < 10) {
          edgeFields.push(thisFinder.grid[field.row + 1][field.col]); //get field on the bottom value
          console.log(
            'thisFinder.grid[field.row + 1][field.col]: ',
            thisFinder.grid[field.row + 1][field.col]
          );
          console.log('edgeFields row < 10: ', edgeFields);
        }

        // if clicked field doesn't touch at least one that is already selected -> show alert and finish function
        console.log('edgeField: ', edgeFields);
        if (!edgeFields.includes(true)) {
          alert(
            'A new field should touch at least one that is already selected!'
          );
          return;
        }
      }

      // select clicked field
      thisFinder.grid[field.row][field.col] = true;
      fieldElem.classList.add(classNames.finder.active);
    }
  }

  changeStep(newStep) {
    const thisFinder = this;
    thisFinder.step = newStep;
    thisFinder.render();
  }

  initActions() {
    const thisFinder = this;
    if (thisFinder.step === 1) {
      thisFinder.element
        .querySelector(select.finder.submitBtn)
        .addEventListener('click', function (e) {
          e.preventDefault();
          thisFinder.changeStep(2);
        });

      thisFinder.element
        .querySelector(select.finder.grid)
        .addEventListener('click', function (e) {
          e.preventDefault();

          if (e.target.classList.contains(classNames.finder.field)) {
            thisFinder.toggleField(e.target);
          }
        });
    } else if (thisFinder.step === 2) {
      // TO DO
    } else if (thisFinder.step === 3) {
      // TO DO
    }
  }

  render() {
    const thisFinder = this;
    // determine what title and button content should be used
    let pageData = null;
    switch (thisFinder.step) {
      case 1:
        pageData = { title: 'Draw routes', buttonText: 'Finish drawing' };
        break;
      case 2:
        pageData = { title: 'Pick start and finish', buttonText: 'Compute' };
        break;
      case 3:
        pageData = { title: 'The best route is', buttonText: 'Start again' };
        break;
    }

    // generate view from the template and set it as page content
    const generatedHTML = templates.finderPage(pageData);
    thisFinder.element.innerHTML = generatedHTML;
    // generate 100 fields for grid and add it to HTML
    let html = '';
    for (let row = 1; row <= 10; row++) {
      html += '<div class="row">';
      for (let col = 1; col <= 10; col++) {
        html +=
          '<div class="col border border-light field" data-row="' +
          row +
          '" data-col="' +
          col +
          '"></div>';
      }
      html += '</div>';
    }

    thisFinder.element.querySelector(select.finder.grid).innerHTML = html;

    thisFinder.initActions();
  }
}
export default Finder;
