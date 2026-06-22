const SandCalculator = (() => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let currentValue = '';
    
    // Add floating sand particles
    function createSandParticles() {
        const container = document.querySelector('.floating-sands');
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'sand-particle';
            container.appendChild(particle);
        }
        
        // Add sparkles
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            container.appendChild(sparkle);
        }
    }
    
    createSandParticles();
    
    function append(value) {
        if (currentValue.length >= 16) return;
        
        if (value === '.') {
            if (currentValue.includes('.')) return;
            if (currentValue === '' || /[+\-*/%]$/.test(currentValue)) {
                currentValue += '0.';
            } else {
                currentValue += '.';
            }
        } else {
            currentValue += value;
        }
        
        updateDisplay();
    }
    
    function clearAll() {
        currentValue = '';
        updateDisplay();
    }
    
    function backspace() {
        currentValue = currentValue.slice(0, -1);
        updateDisplay();
    }
    
    function calculate() {
        if (!currentValue) return;
        
        try {
            const tokens = currentValue.match(/(\d+\.?\d*|[+\-*/%])/g);
            if (!tokens) throw new Error('Invalid');
            
            const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 2 };
            const values = [];
            const operators = [];
            
            function applyOp() {
                const b = values.pop();
                const a = values.pop();
                const op = operators.pop();
                
                switch (op) {
                    case '+': values.push(a + b); break;
                    case '-': values.push(a - b); break;
                    case '*': values.push(a * b); break;
                    case '/': 
                        if (b === 0) throw new Error('Divide by zero');
                        values.push(a / b); 
                        break;
                    case '%': values.push(a % b); break;
                }
            }
            
            tokens.forEach(token => {
                if (!isNaN(Number(token))) {
                    values.push(Number(token));
                } else {
                    while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                        applyOp();
                    }
                    operators.push(token);
                }
            });
            
            while (operators.length) {
                applyOp();
            }
            
            const result = parseFloat(values[0].toFixed(10));
            currentValue = result.toString();
            updateDisplay();
        } catch (error) {
            alert('Error: ' + error.message);
            currentValue = '';
            updateDisplay();
        }
    }
    
    function updateDisplay() {
        display.value = currentValue || '0';
    }
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.dataset.value;
            
            if (value) append(value);
            if (btn.id === 'clear') clearAll();
            if (btn.id === 'backspace') backspace();
            if (btn.id === 'equals') calculate();
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if ('0123456789+-*/%.'.includes(e.key)) {
            append(e.key);
        } else if (e.key === 'Enter') {
            calculate();
        } else if (e.key === 'Backspace') {
            backspace();
        } else if (e.key === 'Escape') {
            clearAll();
        }
    });
    
    updateDisplay();
})();
