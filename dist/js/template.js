// const grid = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 1, 0, 0, 0, 0],
//   [0, 0, 1, 1, 1, 0, 0, 0, 0],
//   [0, 0, 1, 0, 0, 0, 0, 1, 1],
//   [0, 1, 1, 0, 2, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 1, 1, 1, 1, 0],
//   [0, 0, 0, 0, 1, 0, 0, 0, 0],
//   [0, 0, 0, 0, 1, 0, 0, 0, 0],
// ];

// /** @type {Reactangle [][]} */
// const cells = [[], [], [], [], [], [], [], [], []];

// let start;
// let startKey = '';
// let startPos = { row: -1, col: -1 };

// const resetGrid = () => {
//   start.setOptions({ fill: '#ff0000' });
//   for (let i = 0; i < grid.lenght; i++) {
//     const row = grid[i];
//     for (let j = 0; j < row.length; ++j) {
//       if (row[j] > 0) {
//         continue;
//       }

//       cells[i][j].setOptions({ fill: 'white' });
//     }
//   }
// };

// let x = 0;
// let y = 0;

// for (let i = 0; i < grid.length; ++i) {
//   const row = grid[i];
//   for (let j = 0; j < row.length; ++j) {
//     const rect = new Rectangle(new Position(x, y), 50, 50, {
//       fill: row[j] ? 'black' : 'white',
//     });
//     scene.add(rect);

//     if (!row[j]) {
//       rect.on('click', (evt) => {
//         resetGrid();
//         generatePath(i, j);
//       });
//     } else if (row[j] === 2) {
//       start = rect;
//       startKey = `${i}x${j}`;
//       startPos = { row: i, col: j };
//       rect.setOptions({ fill: '#ff0000' });
//     }

//     x += rect.width;

//     cells[i].push(rect);
//   }

//   x = 0;

//   y += 50;
// }

// const generatePath = async (row, col) => {
//   // tworzenie kolejki
//   const queue = [];
//   // rodzic dla komórki:
//   const parentForCell = {};
//   // dodanie do kolejki punktu startowego 'start' msui mieć { row, col }
//   queue.push(startPos);
//   // dopóki jest coś w kolejce, to usuń element z przodu tablicy i umieść go do row, col
//   while (queue.lenght > 0) {
//     const { row, col } = queue.shift();
//     // umieść to jako aktualny key:
//     const currentKey = `${row}x${col}`;
//     const current = cells[row][col];
//     // położenie sąsiednich fieldów:
//     const neightbors = [
//       { row: row - 1, col },
//       { row, col: col + 1 },
//       { row: row + 1, col },
//       { row, col: col - 1 },
//     ];
//     // dla każdego sąsiedniego fielda
//     for (let i = 0; i < neightbors.length; ++i) {
//       // pobierz jego współrzędne row i col dla każdego sąsiada:
//       const nRow = neightbors[i].row;
//       const nCol = neightbors[i].col;
//       // Zabezpieczenie aby nie były brane komórki pod uwagę wychodzące poza obszar matrycy:
//       if (nRow < 0 || nRow > cells.length - 1) {
//         continue;
//       }
//       if (nCol < 0 || nCol > cells.length - 1) {
//         continue;
//       }
//       // oraz dozwolone true:
//       if (grid[nRow][nCol] === 1) {
//         continue;
//       }
//       // zapisz jako klucz row x col:
//       const key = `${nRow}x${nCol}`;
//       // jeśli ten klucz występuje jako nazwa parametru w obiekcie parentForCell to olej to co jest pod continue ale nie wychodz z pętli:
//       if (key in parentForCell) {
//         continue;
//       }
//       // w innym wypadku zapisz pod indexem [key] w parentForCell obiekt key: currentKey i cell: current
//       parentForCell[key] = {
//         // gdzie key to aktualny klucz rodzica tj. currentKey (a nie key!)
//         key: currentKey,
//         // cell to aktualna komórka
//         cell: current,
//       };
//       // i puszczamy do kolejki kolejne komórki
//       queue.push(neightbors[i]);
//     }
//   }
//   /*
//     While queue not empty
//     dequeue
//     getneightbots
//     for each neighbor..
//     if not discovered..
//     add to queue

//     Do tej pory udało nam się zrobić matrycę numerków, dalej tworzymy ścieżkę a to wymaga:
//     generate path with connecting cells
//     change color of cells on path orange
//     */

//   const path = [];

//   // meta key:
//   const currentKey = `${row}x${col}`;

//   // meta:
//   let current = cells[row][col];
//   // dopóki start nie dojdzie do mety
//   while (current !== start) {
//     // wrzucaj do ścieżki path aktualny cell
//     path.push(current);
//     //
//     const { key, cell } = parentForCell[currentKey];
//     current = cell;
//     currentKey = key;
//   }

//   console.dir(path);

//   path.forEach((cell) => {
//     cell.setOptions({ fill: '#FFAD00' });
//   });
// };

// scene.startLoop();
