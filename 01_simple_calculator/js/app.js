// alert("Hello World")

// const btn = document.querySelector("button")

// btn.addEventListener("click", function() {
    // alert("Hello World")
// }

//html element
const aInput = document.querySelector("input#a")

const bInput = document.querySelector("input#b")

const operatorSelect = document.querySelector("select#operator")

const resButton = document.querySelector("button")

const resultSpan = document.querySelector("span#result")

// html element's attributes:
// console.log(aInput.style)  <- show in console
// alert (aInput.className)

// html element's property:
// aInput.value

// function:
function calculate() {

    const aVal = parseFloat(aInput.value)
    const bVal = parseFloat(bInput.value)
    // const result = aVal + bVal
    let result 

    // notes:
    // variable = __  <- let variable
    // 1 == "1"       <- check if they are the same, despite type
    // if(__ === __)  <- check if they are the same content and type

    if(op === "+") {
        result = aVal + bVal 
    }
    
    if(op === "-") {
        result = aVal - bVal 
    }

    if(op === "*") {
        result = aVal * bVal 
    }
    
    if(op === "/") {
        result = aVal / bVal 
    }

    resultSpan.innertext = result
    // alert(result)
}

// property:
// resButton.addEventListener("click", calculate)
document.body.addEventListener("click", calculate)
