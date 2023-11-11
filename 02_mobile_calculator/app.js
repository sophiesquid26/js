const screen =document.querySelector("#screen")
const numBtns = document.querySelector("button.num")
const oprBtns = document.querySelector("button.opr")
const calBtns = document.querySelector("button.cal")


let a = 0
let operation = null
let b = 0

for(let i = 0; i < numBtns.length; i++) {
    const numBtn = numBtns[i]

    numBtn.addEventListener("click", function onBtnClick() {
        if (operation !== null) {
            b = b + numBtn.dataset.num
            screen.innerHTML = + b
        } else {
            a = a + numBtn.dataset.num
            screen.innerHTML = + a
        }
    })
}

for(let i = 0; i < oprBtns.legth; i++) {
    const oprBtn = oprBtns[i]

    oprBtn.addEventListener("click", function () {
        operation = oprBtn.dataset.opr
    })
    
}

calBtns.addEventListener("click", function() {
    switch(operation){
        case "+":
            screen.innerHTML = a + b
            break

        case "-":
            screen.innerHTML = a - b
            break

        case "*":
            screen.innerHTML = a * b
            break
    
        case "/":
            screen.innerHTML = a / b
            break
    }   
})