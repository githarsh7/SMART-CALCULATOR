const display = document.getElementById("display");

// Each operation is separate as required
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
  if (b === 0) {
    alert("Cannot divide by zero!");
    return null;
  }
  return a / b;
}

function modulus(a, b) {
  return a % b;
}


// Safe expression evaluator (No Blind Eval)
function evaluateExpression(expr) {
  try {
    // Split numbers & operators
    let tokens = expr.match(/(\d+\.?\d*|\+|\-|\*|\/|%)/g);

    if (!tokens) return "";

    // Operator precedence
    const precedence = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2 };

    let values = [];
    let operators = [];

    function applyOperator() {
      let b = values.pop();
      let a = values.pop();
      let op = operators.pop();

      switch (op) {
        case "+": values.push(add(a, b)); break;
        case "-": values.push(subtract(a, b)); break;
        case "*": values.push(multiply(a, b)); break;
        case "/": values.push(divide(a, b)); break;
        case "%": values.push(modulus(a, b)); break;
      }
    }

    tokens.forEach(token => {
      if (!isNaN(token)) {
        values.push(Number(token));
      } else {
        while (
          operators.length &&
          precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
          applyOperator();
        }
        operators.push(token);
      }
    });

    while (operators.length) {
      applyOperator();
    }

    return values[0];
  } catch (err) {
    alert("Invalid Expression");
    return "";
  }
}

/*BUTTON CLICK HANDLING*/

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;

    if (value) {
      display.value += value;
    }

    if (btn.id === "clear") {
      display.value = "";
    }

    if (btn.id === "backspace") {
      display.value = display.value.slice(0, -1);
    }

    if (btn.id === "equals") {
      display.value = evaluateExpression(display.value);
    }
  });
});
// Keyboard Handling
document.addEventListener("keydown", (e) => {
  const key = e.key;

  const allowedKeys = "0123456789+-*/%";

  // Allow numbers and operators
  if (allowedKeys.includes(key)) {
    display.value += key;
  }
  // Enter key = calculate
  else if (key === "Enter") {
    display.value = evaluateExpression(display.value);
  }
  // Backspace
  else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }
  // Block all invalid keys
  else {
    e.preventDefault();
    alert("Invalid key! Only numbers and operators allowed!!");
  }
});