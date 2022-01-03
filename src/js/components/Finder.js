import { classNames, select, templates } from '../settings.js';
import utils from '../utils.js';

class Finder {
  constructor(element) {
    const thisFinder = this;
    thisFinder.element = element;
    thisFinder.step = 1;
    thisFinder.StartFinishField = [];
    thisFinder.start = {};
    thisFinder.finish = {};
    thisFinder.grid = {};
    for (let row = 1; row <= 10; row++) {
      thisFinder.grid[row] = {};
      for (let col = 1; col <= 10; col++) {
        thisFinder.grid[row][col] = false;
      }
    }
    thisFinder.render();
  }

  toggleField(fieldElem) {
    const thisFinder = this;
    const field = {
      row: Number(fieldElem.getAttribute('data-row')),
      col: Number(fieldElem.getAttribute('data-col')),
    };

    switch (thisFinder.step) {
    case 1:
      if (thisFinder.grid[field.row][field.col]) {
        thisFinder.grid[field.row][field.col] = false;
        fieldElem.classList.remove(classNames.finder.active);
      } else {
        const gridValues = Object.values(thisFinder.grid)
          .map((col) => Object.values(col))
          .flat();
        if (gridValues.includes(true)) {
          const edgeFields = [];
          if (field.col > 1) {
            edgeFields.push(thisFinder.grid[field.row][field.col - 1]);
          }
          if (field.col < 10) {
            edgeFields.push(thisFinder.grid[field.row][field.col + 1]);
          }
          if (field.row > 1) {
            edgeFields.push(thisFinder.grid[field.row - 1][field.col]);
          }
          if (field.row < 10) {
            edgeFields.push(thisFinder.grid[field.row + 1][field.col]);
          }

          if (!edgeFields.includes(true)) {
            alert(
              'A new field should touch at least one that is already selected!'
            );
            return;
          }
        }

        thisFinder.grid[field.row][field.col] = true;
        fieldElem.classList.add(classNames.finder.active);
      }
      break;
    case 2:
      {
        const selectedFieldIsStart = utils.arrEqueals(
          Object.values(field),
          Object.values(thisFinder.start)
        );

        if (
          thisFinder.grid[field.row][field.col] &
            (Object.keys(thisFinder.start).length === 0)
        ) {
          fieldElem.classList.add(classNames.finder.start);
          thisFinder.start = field;
          thisFinder.StartFinishField.push(thisFinder.start);
        } else if (
          thisFinder.grid[field.row][field.col] &
            (Object.keys(thisFinder.start).length > 0) &
            !selectedFieldIsStart &
            (thisFinder.StartFinishField.length < 2)
        ) {
          fieldElem.classList.add(classNames.finder.finish);
          thisFinder.StartFinishField.push(thisFinder.finish);
          thisFinder.finish = field;
        } else {
          alert('Start or Finish should be a selected path field!');
          return;
        }
      }
      break;
    }
  }

  changeStep(newStep) {
    const thisFinder = this;
    thisFinder.step = newStep;
    thisFinder.render();
  }

  generatePath(startField, finishField, selectedFields) {
    const queue = [];

    const parentForCell = {};
    queue.push(startField);

    while (queue.length > 0) {
      const { row, col } = queue.shift();
      const currentKey = `${row}x${col}`;

      const neightbors = [
        { row: row - 1, col },
        { row, col: col + 1 },
        { row: row + 1, col },
        { row, col: col - 1 },
      ];
      for (let i = 0; i < neightbors.length; ++i) {
        const nRow = neightbors[i].row;
        const nCol = neightbors[i].col;

        if (nRow < 1 || nRow > 10) {
          continue;
        }
        if (nCol < 1 || nCol > 10) {
          continue;
        }

        if (!selectedFields[nRow][nCol]) {
          continue;
        }
        const key = `${nRow}x${nCol}`;
        if (key in parentForCell) {
          continue;
        }

        parentForCell[key] = {
          key: currentKey,
        };
        queue.push(neightbors[i]);
      }
    }

    const path = [];
    const startFieldKey = startField.row + 'x' + startField.col;
    const { row, col } = finishField;
    let currentKey = `${row}x${col}`;

    while (currentKey !== startFieldKey) {
      path.push(currentKey);
      const currentKeyArray = currentKey.split('x');
      const pathFieldRow = Number(currentKeyArray[0]);
      const pathFieldCol = Number(currentKeyArray[1]);

      const pathField = document.querySelector(
        '.field[data-row="' +
          pathFieldRow +
          '"][data-col="' +
          pathFieldCol +
          '"]'
      );

      pathField.classList.add(classNames.finder.path);
      const { key } = parentForCell[currentKey];
      currentKey = key;
      if (currentKey === startField) break;
    }
  }

  resetValues() {
    const thisFinder = this;
    thisFinder.step = 1;
    thisFinder.StartFinishField = [];
    thisFinder.start = {};
    thisFinder.finish = {};
    thisFinder.grid = {};
    for (let row = 1; row <= 10; row++) {
      thisFinder.grid[row] = {};
      for (let col = 1; col <= 10; col++) {
        thisFinder.grid[row][col] = false;
      }
    }
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
      thisFinder.element
        .querySelector(select.finder.submitBtn)
        .addEventListener('click', function (e) {
          e.preventDefault();
          thisFinder.changeStep(3);
        });

      thisFinder.element
        .querySelector(select.finder.grid)
        .addEventListener('click', function (e) {
          e.preventDefault();

          if (e.target.classList.contains(classNames.finder.field)) {
            thisFinder.toggleField(e.target);
          }
        });
    } else if (thisFinder.step === 3) {
      thisFinder.element
        .querySelector(select.finder.submitBtn)
        .addEventListener('click', function (e) {
          e.preventDefault();
          thisFinder.resetValues();
          thisFinder.render();
        });

      thisFinder.element
        .querySelector(select.finder.grid)
        .addEventListener('click', function (e) {
          e.preventDefault();

          if (e.target.classList.contains(classNames.finder.field)) {
            thisFinder.toggleField(e.target);
          }
        });
    }
  }

  render() {
    const thisFinder = this;
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

    const generatedHTML = templates.finderPage(pageData);
    thisFinder.element.innerHTML = generatedHTML;
    let html = '';
    for (let row = 1; row <= 10; row++) {
      html += '<div class="row">';
      for (let col = 1; col <= 10; col++) {
        html +=
          '<div class="col border border-light field" data-row=' +
          row +
          ' data-col=' +
          col +
          '></div>';
      }
      html += '</div>';
    }
    thisFinder.element.querySelector(select.finder.grid).innerHTML = html;

    if (thisFinder.step == 2 || thisFinder.step == 3) {
      for (let [rowKey] of Object.entries(thisFinder.grid)) {
        for (let [colKey, colVal] of Object.entries(thisFinder.grid[rowKey])) {
          if (colVal) {
            const fieldToAcctive = document.querySelector(
              '.field[data-row="' + rowKey + '"][data-col="' + colKey + '"]'
            );
            fieldToAcctive.classList.add(classNames.finder.active);
          }
        }
      }
    }

    if (thisFinder.step == 3) {
      const startFieldArray = [];
      const finishFieldArray = [];

      for (const [key, value] of Object.entries(thisFinder.start)) {
        startFieldArray.push(value);
        console.log(key);
      }
      for (const [key, value] of Object.entries(thisFinder.finish)) {
        finishFieldArray.push(value);
        console.log(key);
      }

      const startField = document.querySelector(
        '.field[data-row="' +
          thisFinder.start.row +
          '"][data-col="' +
          thisFinder.start.col +
          '"]'
      );
      const finishField = document.querySelector(
        '.field[data-row="' +
          finishFieldArray[0] +
          '"][data-col="' +
          finishFieldArray[1] +
          '"]'
      );

      startField.classList.add(classNames.finder.start);
      finishField.classList.add(classNames.finder.finish);
      this.generatePath(thisFinder.start, thisFinder.finish, thisFinder.grid);
    }

    thisFinder.initActions();
  }
}
export default Finder;
