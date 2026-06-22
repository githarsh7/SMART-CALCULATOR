const display = document.getElementById("display");

// Beach-themed math functions
function add(a, b) { 
    const beachMessages = [
        "Stacking sand piles! 🏖️",
        "Building beach towers! 🏝️",
        "Adding waves together! 🌊"
    ];
    console.log(beachMessages[Math.floor(Math.random() * beachMessages.length)]);
    return a + b; 
}

function subtract(a, b) { 
    if (a === b) {
        alert("🏖️ They're equal! Zero sand left!");
    }
    return a - b; 
}

function multiply(a, b) { 
    if (a === 0 || b === 0) {
        alert("🌊 Oops! Zero times anything = no sand at the beach!");
    }
    return a * b; 
}

function divide(a, b) { 
    if (b === 0) { 
        alert("🚫 STOP! Can't divide by zero!");
        alert("🏖️ Why did the beach number cross the road? To get to the other-side of the sand! 🤣");
        return null; 
    }
    return a / b; 
}

function modulus(a, b) { 
    const remainder = a % b;
    if (remainder === 0) {
        console.log("🏝️ Perfect division! Smooth sand!");
    } else {
        console.log(`🌊 Left with ${remainder} grains of sand!`);
    }
    return remainder; 
}

// Safe expression evaluator (No Blind Eval)
function evaluateExpression(expr) {
    try {
        let tokens = expr.match(/(\d+\.?\d*|+|-|*|/|%)/g);
        if (!tokens) return "";

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
                while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                    applyOperator();
                }
                operators.push(token);
            }
        });

        while (operators.length) {
            applyOperator();
        }

        const result = values[0];
        
        // Beach result messages
        if (result === 42) {
            alert("🏝️ 42? The answer to life, the universe, and beach days! 🌊");
        } else if (result === 0) {
            alert("🏖️ Zero sand! Empty beach bucket!");
        } else if (result > 1000) {
            alert("🌊 WOOSH! That's a tsunami of numbers! 🏝️");
        } else if (result > 0 && result < 10) {
            alert("🏖️ Nice small number! Perfect for beach counting!");
        }

        return result;
    } catch (err) {
        alert("🤯 Invalid Expression! Did you spill sand in your calculator? 🏖️");
        return "";
    }
}

// BUTTON CLICK HANDLING
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.dataset.value;
        
        if (value) {
            display.value += value;
        }
        
        if (btn.id === "clear") { 
            display.value = ""; 
            alert("🏖️ All cleared! Like washing sand off at sunset! 🌅");
        }
        
        if (btn.id === "backspace") { 
            display.value = display.value.slice(0, -1);
            console.log("🌊 Backspaced! One less grain of sand!");
        }
        
        if (btn.id === "equals") { 
            if (display.value === "") {
                alert("🤔 Empty beach? Put something in first!");
            } else {
                display.value = evaluateExpression(display.value);
                setTimeout(() => {
                    alert("🏝️ BOOM! Beach math complete! 🌊");
                }, 100);
            }
        }
    });
});

// Keyboard Handling with beach messages
document.addEventListener("keydown", (e) => {
    const key = e.key;
    const allowedKeys = "0123456789+-*/%";
    
    if (allowedKeys.includes(key)) {
        display.value += key;
    } else if (key === "Enter") {
        if (display.value === "") {
            alert("🏖️ Beach is empty! Type something first!");
        } else {
            display.value = evaluateExpression(display.value);
            alert("🌊 Enter = EQUALS! You're a beach math wizard! 🏝️");
        }
    } else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    } else {
        e.preventDefault();
        const beachMessages = [
            "🚫 Invalid key! Only beach numbers allowed! 🏖️",
            "🤨 Nope! That's not for sand math! 🏝️",
            "🌊 Wrong key! This is a BEACH CALCULATOR! 🏖️",
            "🏖️ Huh? Try numbers and math symbols only! 🌊"
        ];
        alert(beachMessages[Math.floor(Math.random() * beachMessages.length)]);
    }
});
