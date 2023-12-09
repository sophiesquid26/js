const pg = document.querySelector("#playground");
const pgStyle = getComputedStyle(pg);

const WIDTH = parseInt(pgStyle.getPropertyValue("--width"));
const HIGHT = parseInt(pgStyle.getPropertyValue("--height"));

const COLS = 10;
const ROWS = 20;
const TOTAL_CELLS = COLS * ROWS;

const cellWidth = WIDTH / COLS;
const cellHeight = HIGHT / ROWS;

pg.style.setProperty("--cell-width", cellWidth + "px");
pg.style.setProperty("--cell-height", cellHeight + "px");

const cells = [];
for (let i = 0; i < TOTAL_CELLS; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cells.push(cell);
  pg.appendChild(cell);
}

const shapes = [];

shapes.push([[1, 1, 1, 1]]);

// shapes.push([[1], [1], [1], [1]]);

// // --
// shapes.push([
//   [0, 0, 1],
//   [1, 1, 1]
// ]);

// shapes.push([
//   [1, 0],
//   [1, 0],
//   [1, 1]
// ]);

// shapes.push([
//   [1, 1, 1],
//   [1, 0, 0]
// ]);

// shapes.push([
//   [1, 1],
//   [0, 1],
//   [0, 1]
// ]);

// // --
// shapes.push([
//   [1, 0, 0],
//   [1, 1, 1]
// ]);

// shapes.push([
//   [1, 1],
//   [1, 0],
//   [1, 0]
// ]);

// shapes.push([
//   [1, 1, 1],
//   [0, 0, 1]
// ]);

// shapes.push([
//   [0, 1],
//   [0, 1],
//   [1, 1]
// ]);

// // --
// shapes.push([
//   [0, 1, 0],
//   [1, 1, 1]
// ]);

// shapes.push([
//   [1, 0],
//   [1, 1],
//   [1, 0]
// ]);

// shapes.push([
//   [1, 1, 1],
//   [0, 1, 0]
// ]);

// shapes.push([
//   [0, 1],
//   [1, 1],
//   [0, 1]
// ]);

// // --
// shapes.push([
//   [1, 1],
//   [1, 1]
// ]);

function rotateShape(shape) {
  const rows = shape.length;
  const cols = shape[0].length;
  const nArr = [];
  for (let i = 0; i < cols; i++) {
    nArr.push([]);
  }

  shape.forEach((row, i) => {
    row.forEach((val, j) => {
      nArr[j][rows - i - 1] = val;
    });
  });
  return nArr;
}

let pgState = [];

function initPG() {
  pgState = Array.from({ length: ROWS }, () => {
    return Array.from({ length: COLS }, () => 0);
  });
}
initPG();

function randomStartColForShape(shape) {
  return Math.floor(Math.random() * (COLS - shape[0].length));
}

function randomShape() {
  const idx = Math.floor(Math.random() * shapes.length);
  return shapes[idx];
}

let shape = randomShape();
let startCol = randomStartColForShape(shape);

function addShapeToPG(state, shape, colIdx, rowIdx = 0) {
  const newState = JSON.parse(JSON.stringify(state));

  for (let j = 0; j < shape.length; j++) {
    if (rowIdx + j >= ROWS) return null;

    const row = shape[j];
    for (let i = 0; i < row.length; i++) {
      const col = row[i];
      if (col !== 1) continue;

      // already have block
      if (newState[rowIdx + j][colIdx + i] === 1) return null;
      newState[rowIdx + j][colIdx + i] = 1;
    }
  }
  return newState;
}

let currentState = pgState;
function render() {
  let idx = 0;
  currentState.forEach((rows) => {
    rows.forEach((cell) => {
      const cellEl = cells[idx];
      cellEl.classList.remove("hl");
      if (cell === 1) cellEl.classList.add("hl");
      idx += 1;
    });
  });
}

let startRow = 0;
function nextShape() {
  startRow = 0;
  startCol = randomStartColForShape(shape);
  shape = randomShape();
}

function checkRow() {
  let fc = 0;
  const nState = currentState.filter((row) => {
    const full = row.filter((x) => x === 1).length === row.length;
    if (full) fc += 1;
    return !full;
  });

  for (let i = 0; i < fc; i++) {
    nState.unshift(Array.from({ length: COLS }, () => 0));
  }

  return nState;
}

function actStep(step = 1) {
  // always add to pgState
  const state = addShapeToPG(pgState, shape, startCol, startRow);
  if (state) {
    currentState = state;
    render();

    startRow += step;
  } else {
    currentState = checkRow();

    pgState = currentState;
    nextShape();
  }
}

function restart() {
  initPG();
  nextShape();
}

document.querySelector(".restart").addEventListener("click", restart);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    if (startCol > 0) startCol -= 1;
  } else if (e.key === "ArrowRight") {
    if (startCol < COLS - shape[0].length) startCol += 1;
  } else if (e.key === "ArrowDown") {
    actStep(1);
  } else if (e.key === "ArrowUp") {
    shape = rotateShape(shape);
  }
  actStep(0);
});

setInterval(actStep, 50);