const currInput = document.querySelector(".current-input");
const lastInput = document.querySelector(".last-input");
const numButtons = document.querySelectorAll(".btn-num");
const operatorButtons = document.querySelectorAll(".btn-operator");
const clearBtn = document.querySelector(".btn-clear");
const deleteBtn = document.querySelector(".btn-delete");
const dotBtn = document.querySelector("#dot");
const answerBtn = document.querySelector(".btn-equal");

let operPressedBefore = false;
let dotPresent = false;
let displayValue = "";

numButtons.forEach((button) => {
    button.addEventListener("click", populate);
});

dotBtn.addEventListener("click", populate);

answerBtn.addEventListener("click", function () {
    if (!currInput.textContent || !lastInput.textContent) {
        return;
    }
    const [num1, operator] = lastInput.textContent.split(" ");
    const num2 = +displayValue;
    clear();
    currInput.textContent = operate(operator, +num1, num2);
    displayValue = currInput.textContent;
    if (displayValue.includes(".")) {
        dotPresent = true;
    }
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", function () {
        if (operPressedBefore) {
            if (!displayValue) {
                let [number, operator] = lastInput.textContent.split(" ");
                operator = this.textContent;
                lastInput.textContent = number + " " + operator;
                return;
            }
            const [num1, operator] = lastInput.textContent.split(" ");
            const num2 = +displayValue;
            lastInput.textContent =
                operate(operator, +num1, num2) + " " + this.textContent;
            currInput.textContent = "";
            displayValue = "";
            return;
        }
        if (!displayValue) return;
        let operator = this.textContent;
        lastInput.textContent = displayValue + " " + operator;
        currInput.textContent = "";
        displayValue = "";
        dotPresent = false;
        operPressedBefore = true;
    });
});

clearBtn.addEventListener("click", clear);
deleteBtn.addEventListener("click", remove);

function populate() {
    if (this.textContent === ".") {
        if (!displayValue) return;
        if (dotPresent) return;
        dotPresent = true;
    }

    if (displayValue.length === 30) {
        clear();
    }
    const num = document.createTextNode(this.textContent);
    currInput.appendChild(num);
    displayValue = currInput.textContent;
}

function clear() {
    lastInput.textContent = "";
    currInput.textContent = "";
    displayValue = "";
    dotPresent = false;
    operPressedBefore = false;
}

function remove() {
    if (!displayValue && lastInput.textContent) {
        const number = lastInput.textContent.split(" ").at(0);
        lastInput.textContent = "";
        operPressedBefore = false;
        for (const digit of number) {
            const digitNode = document.createTextNode(digit);
            currInput.appendChild(digitNode);
        }
        displayValue = currInput.textContent;
        return;
    }

    if (currInput.lastChild.textContent === ".") {
        dotPresent = false;
    }
    currInput.lastChild.remove();
    displayValue = currInput.textContent;
}

function add(x, y) {
    return dotPresent ? (x + y).toFixed(2) : x + y;
}

function subtract(x, y) {
    return dotPresent ? (x - y).toFixed(2) : x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {
        return x;
    }
    if (dotPresent || (x / y).toString().includes(".")) {
        return (x / y).toFixed(2);
    }
    return x / y;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return;
    }
}
