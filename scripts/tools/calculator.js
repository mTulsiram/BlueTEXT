(function() {
    'use strict';

    function initCalculator() {
        const display = document.getElementById('calc-display');
        if (!display) return; // Not on the calculator page

        const buttons = document.querySelector('.calc-buttons');
        let currentInput = '0';
        let previousInput = '';
        let operator = null;

        function updateDisplay() {
            display.textContent = currentInput;
            // Adjust font size for long numbers
            if (currentInput.length > 10) {
                display.style.fontSize = '2rem';
            } else if (currentInput.length > 7) {
                display.style.fontSize = '2.5rem';
            } else {
                display.style.fontSize = '3.5rem';
            }
        }

        function calculate() {
            let result;
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);
            if (isNaN(prev) || isNaN(current)) return;
            switch (operator) {
                case 'add':
                    result = prev + current;
                    break;
                case 'subtract':
                    result = prev - current;
                    break;
                case 'multiply':
                    result = prev * current;
                    break;
                case 'divide':
                    result = current === 0 ? 'Error' : prev / current;
                    break;
                default:
                    return;
            }
            currentInput = String(result).slice(0, 15); // Limit length to avoid overflow
            operator = null;
            previousInput = '';
        }

        buttons.addEventListener('click', e => {
            if (!e.target.matches('button')) return;
            const btn = e.target;
            const action = btn.dataset.action;
            const number = btn.dataset.number;

            if (number !== undefined) {
                if (currentInput === '0' || currentInput === '-0') {
                    currentInput = currentInput === '-0' ? '-' + number : number;
                } else {
                    currentInput += number;
                }
                updateDisplay();
                return;
            }

            if (action) {
                switch (action) {
                    case 'clear':
                        currentInput = '0';
                        previousInput = '';
                        operator = null;
                        break;
                    case 'negate':
                        currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
                        break;
                    case 'percent':
                        currentInput = String(parseFloat(currentInput) / 100);
                        break;
                    case 'decimal':
                        if (!currentInput.includes('.')) {
                            currentInput += '.';
                        }
                        break;
                    case 'calculate':
                        if (operator && previousInput) {
                            calculate();
                        }
                        break;
                    default: // Add, subtract, multiply, divide
                        if (operator && previousInput) {
                            calculate();
                        }
                        previousInput = currentInput;
                        currentInput = '0';
                        operator = action;
                        break;
                }
                updateDisplay();
            }
        });
    }

    // Initialize on DOMContentLoaded and custom pageLoaded event
    document.addEventListener('DOMContentLoaded', initCalculator);
    document.addEventListener('pageLoaded', initCalculator);
})();