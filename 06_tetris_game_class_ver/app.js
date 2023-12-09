const pg = document.querySelector("#playground");
const pgStyle = getComputedStyle(pg);

const WIDTH = parseInt(pgStyle.getPropertyValue("--width"));
const HIGHT = parseInt(pgStyle.getPropertyValue("--height"));

const COLS = 10;
const ROWS = 20;
const TOTAL_CELLS = COLS * ROWS;

function initPlayGroud() {
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

    return cells;
}

const cells = initPlayGround();

class Shape {
    get rows() {
        return this.shape.length;
    }
    get cols() {
        return this.shape[0].length;
    }
    rotate() {
        const nArr = Array.from({ length: this.cols }, () => []);

        this.shape.forEach((row, i) => {
            row.forEach((val, j) => {
                nArr[j][this.rows - i - 1] = val;
            });
        });

        this.shape = nArr;
    }
}

class ShapeA extends Shape {
    shape = [[1, 1, 1, 1]];
}

class ShapeB extends Shape {
    shape = [[1], [1], [1], [1]];
}

const shapes = [];

shapes.push(new ShapeA());
shapes.push(new ShapeB());

function randomShape() {
    const idx = Math.floor(Math.random() * shapes.length);
    return shapes[idx];
}

// shapes.push([[1, 1, 1, 1]]);

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

class Game {
    state = [];
    prevState = null;

    // shape 在棋盤上的位置
    x = 0;
    y = 0;

    constructor() {
        this.start();
    }

    start() {
        this.init();
        this.randomShape();
    }

    // 建立一個棋盤大小的二維數組，全部填 0
    init() {
        this.state = Array.from({ length: ROWS }, () => {
            return Array.from({ length: COLS }, () => 0);
        });
    }

    randomShape() {
        this.shape = randomShape();

        // 設置隨機開始位置
        this.y = 0;
        this.x = Math.floor(Math.random() * (COLS - this.shape.cols));
    }

    actStep(step = 1) {
        const tmpState = this.putShape();

        if (tmpState) {
            this.render(tmpState);

            this.y += step;
            this.prevState = tmpState;
        } else {
            this.check(this.prevState);

            this.randomShape();
        }
    }

    render(state) {
        let idx = 0;
        state.forEach((rows) => {
            rows.forEach((cell) => {
                const cellEl = cells[idx];

                cellEl.classList.remove("hl");
                if (cell === 1) cellEl.classList.add("hl");
                idx += 1;
            });
        });
    }

    // 檢查是否可以消除一行
    check(state) {
        let fc = 0;
        const nState = state.filter((row) => {
            const full = row.filter((x) => x === 1).length === row.length;
            if (full) fc += 1;
            return !full;
        });

        for (let i = 0; i < fc; i++) {
            nState.unshift(Array.from({ length: COLS }, () => 0));
        }

        this.state = nState;
    }

    // 將 shape 放置在棋盤上
    putShape() {
        // 複製一份棋盤
        const nState = JSON.parse(JSON.stringify(this.state));

        for (let j = 0; j < this.shape.rows; j++) {
            if (this.y + j >= ROWS) return null;

            const row = this.shape.shape[j];
            for (let i = 0; i < row.length; i++) {
                const col = row[i];
                if (col !== 1) continue;

                // 如果想要放入的位置已經有數據
                // 表示無法再放置內容，返回 null
                if (nState[this.y + j][this.x + i] === 1) return null;
                nState[this.y + j][this.x + i] = 1;
            }
        }
        return nState;
    }

    ArrowLeft() {
        if (this.x > 0) this.x -= 1;
    }

    ArrowRight() {
        if (this.x < COLS - this.shape.cols) this.x += 1;
    }

    ArrowDown() {
        this.actStep(1);
    }

    ArrowUp() {
        this.shape.rotate();
    }
}

const game = new Game();

document.querySelector(".restart").addEventListener("click", () => {
    game.start();
});

document.addEventListener("keydown", (e) => {
    game[e.key]?.();

    // just render the pg
    game.actStep(0);
});

// setInterval(actStep, 500);
setInterval(() => {
    game.actStep();
}, 500);