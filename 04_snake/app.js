const pg = document.querySelector("#playground")
const pgStyle = getComputedStyle(pg)


const WIDTH = parseInt(pgStyle.getPropertyValue("--width"))
const HEIGHT = parseInt(pgStyle.getPropertyValue("--height"))

const COLS = 10
const ROWS = 20
const TOTAL_CELLS = COLS * ROWS

const cellWidth = WIDTH / COLS
const cellHeight = HEIGHT / WIDTH


const CELLS= []
for(let i = 0; i < TOTAL_CELLS; i++) {
    const cell = document.createElement("div")
    cell.classList.add("cell")
    cell.style.width = cellWidth + "px"
    cell.style.height = cellHeight + "px"
    pg.appendChild(cell)

    CELLS.push(cell)
}
console.log(CELLS)

const snake = [31, 32, 33, 43]

//ways to write a function:
//fuction fuctName() {...}
//const functName = function() {...}
//const functName = () => {...}                       (simpler)
//const functName = (but without the()) => {...}      (for short functions)
//const functName = () => ...                         (for one-line functions)

function renderSnake() {
    const cells = CELLS.filter(cell => cell.classList.contains("has-snake"))
    cells.forEach ((cell) => cell.classList.remove("has-snake"))

    snake.forEach((cellIdx) => {
        const cell =CELLS[idx]
        cell.classList.add("has-snake")
    })
}
renderSnake()


//push() = put sth (can be multiple) into the end of the array
//pop() = remove the last var from the array
//shift() = get the first var from the array
//unshift() = get the last var from the array
document.addEventListener("keydown", (event) => {
    const cellIdx = snake[0]
    if(event.key === "ArrowDown") {
        cellIdx += COLS
    } else if (event.key === "ArrowUp") {
        cellIdx -= COLS
    } else if (event.key === "ArrowLeft") {
        cellIdx -= 1
    } else if (event.key === "ArrowRight") {
        cellIdx += 1
    }

    //check if snake touches the wall 
    const r = Math.floor(cellIdx / COLS)
    const c = cellIdx % COLS
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) {
        alert("Game Over")
        return
    }

    //add current cell index to the snake
    snake.unshift(cellIdx)

    //remove the tail
    if (CELLS[cellIdx].classList.contains("has-food")) {
        CELLS[cellIdx].classList.remove("has-food")
        dropfood()
    } else {
        snake.pop()
    }
    
    renderSnake()
})
   
const pgArray = []
for(let i= 0; i < TOTAL_CELLS; i++) {
    pgArray.push(pgArray)
}

function dropfood() {
    //filter cells that do not have snake body
    const avaliableCells = pgArray.filter(function(el) {
        return !snake.includes(el)
    })
    console.log(avaliableCells)

    //get a random index from availabel cells
    let randomPos = Math.floor(Math.random() * avaliableCells.length)

    //get random index
    const cellIdx = avaliableCells[randomPos]

    //get the cell
    const cell = CELLS[cellIdx]

    //get the food class
    cell.classList.add("has-food")
}
dropfood()