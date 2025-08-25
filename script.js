document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const keys = document.querySelector('.calculator__keys');

    let firstValue = '';
    let operator = '';
    let secondValue = '';
    let result = '';

    keys.addEventListener('click', e => {
        if (!e.target.matches('button')) return;

        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        if (!action) {
            // A number key was clicked
            if (displayedNum === '0' || (operator && secondValue === '')) {
                display.textContent = keyContent;
            } else {
                display.textContent += keyContent;
            }
            if (operator) {
                secondValue += keyContent;
            } else {
                firstValue += keyContent;
            }
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            if (firstValue && operator && secondValue) {
                result = calculate(firstValue, operator, secondValue);
                display.textContent = result;
                firstValue = result;
                secondValue = '';
            } else if (firstValue) {
                operator = action;
                firstValue = display.textContent;
            }
        }

        if (action === 'decimal') {
            if (!display.textContent.includes('.')) {
                display.textContent += '.';
                if (operator) {
                    secondValue += '.';
                } else {
                    firstValue += '.';
                }
            }
        }

        if (action === 'clear') {
            display.textContent = '0';
            firstValue = '';
            operator = '';
            secondValue = '';
            result = '';
        }

        if (action === 'calculate') {
            if (firstValue && operator) {
                secondValue = secondValue || firstValue;
                result = calculate(firstValue, operator, secondValue);
                display.textContent = result;
                firstValue = result;
                secondValue = '';
            }
        }
    });

    const calculate = (n1, operator, n2) => {
        const num1 = parseFloat(n1);
        const num2 = parseFloat(n2);
        if (operator === 'add') return num1 + num2;
        if (operator === 'subtract') return num1 - num2;
        if (operator === 'multiply') return num1 * num2;
        if (operator === 'divide') return num1 / num2;
    };
});
