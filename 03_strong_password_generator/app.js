const btn = document.querySelector("button")

const lenInput = document.querySelector("input#len")
const resultDiv = document.querySelector("#result")

const lowerStr = "abcdefghijklmnopqrstuvwxyz"
const upperStr = lowerStr.toUpperCase()
const nums = "0123456789"
const symbols = "!@#$%^&*()_+{}|:<>?[]\;'',./"

btn.addEventListener("click", function() {
    let str =""
    const options = lowerStr + upperStr + nums + symbols

    const len = +lenInput.value 
    for (let i = 0; i < len; i++) {
        const idx = Math.floor(Math.random() * options.length)
        str += option[idx]
    }

    resultDiv.innerText = str
})