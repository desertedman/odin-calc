let errMsg = "";

let btnsIdx = 0;
const btns = [
  '7', '8', '9', '/',
  '4', '5', '6', 'x',
  '1', '2', '3', '-',
  '0', '.', '=', '+',
];

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b != 0)
    return a / b;

  else {
    errMsg = "Division by 0 attempted";
    return null;
  }
}

let currNum = "";
let a = 0;
let b = 0;
let operation = '';

function operate(a, b, operator) {
  let operation = null;

  switch (operator) {
    case '+':
      operation = add;
      break;
    case '-':
      operation = subtract;
      break;
    case 'x':
      operation = multiply;
      break;
    case '/':
      operation = divide;
      break;
    default:
      errMsg = "Invalid operation";
      return null;
  }

  return operation(a, b);
}

const container = document.querySelector(".container");

function initCalc() {
  // Create calculator display
  for (let i = 0; i < 4; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < 4; j++) {
      const item = document.createElement("button");
      item.classList.add("item");

      let btn = `${btns[btnsIdx]}`;
      item.textContent = btn;

      // number
      if (!Number.isNaN(parseInt(btn))) {
        item.classList.add("num");
      }

      else if (btn === "=") {
        item.id = "equals";
      }

      else if (btn === ".") {
        // do nothing
      }

      // operator
      else
        item.classList.add("operator");


      btnsIdx++;
      row.appendChild(item);
    }

    container.appendChild(row);
  }

  const display = document.createElement("div");
  display.classList.add("display");
  display.textContent = "0";
  container.appendChild(display);

  const clearBtn = document.createElement("button");
  clearBtn.id = "clear";
  clearBtn.textContent = "Clear";
  container.appendChild(clearBtn);

  let firstNum = true;
  let valid = false;
  function saveNum(num) {
    num = parseInt(num);

    if (firstNum) {
      a = num;
      firstNum = false;
    }

    else {
      b = num;
      firstNum = true;
    }
  }

  // Register event listener for buttons
  container.addEventListener("click", (e) => {
    let target = e.target;
    let classList = target.classList;

    if (classList.contains("num")) {
      currNum += target.innerText;
      display.textContent = currNum;
    }

    else if (classList.contains("operator")) {
      saveNum(currNum);
      currNum = "";
      operation = target.textContent;
    }

    else if (target.id === "equals") {
      saveNum(currNum);
      currNum = "";
      let result = operate(a, b, operation);
      display.textContent = (result) ? result : 0;

      console.log(result);
      a = 0; b = 0;
    }

    else if (target.id === "clear") {
      currNum = "";
      a = 0; b = 0;

      display.textContent = "0";
    }
  });
}

initCalc();
