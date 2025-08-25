document.addEventListener('DOMContentLoaded', () => {
    const displayOutput = document.querySelector('.calculator-output');
    const displayHistory = document.querySelector('.calculator-history');
    const keys = document.querySelector('.calculator-keys');

    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = false;
    let history = '';

    keys.addEventListener('click', (e) => {
        const { target } = e;
        if (!target.matches('button')) {
            return;
        }

        const value = target.textContent;
        const action = target.dataset.action;

        if (action) {
            handleAction(action, value);
        } else {
            handleNumber(value);
        }

        updateDisplay();
    });

    const handleNumber = (number) => {
        if (waitingForSecondValue) {
            displayOutput.textContent = number;
            waitingForSecondValue = false;
        } else {
            displayOutput.textContent = displayOutput.textContent === '0' ? number : displayOutput.textContent + number;
        }
    };

    const handleAction = (action, value) => {
        if (action === 'clear') {
            displayOutput.textContent = '0';
            displayHistory.textContent = '';
            firstValue = null;
            operator = null;
            waitingForSecondValue = false;
            return;
        }

        if (action === 'decimal') {
            if (!displayOutput.textContent.includes('.')) {
                displayOutput.textContent += '.';
            }
            return;
        }

        if (action === 'calculate') {
            if (firstValue === null || operator === null) {
                return;
            }
            const result = performCalculation(firstValue, operator, parseFloat(displayOutput.textContent));
            displayOutput.textContent = result;
            firstValue = result;
            operator = null;
            waitingForSecondValue = true;
            displayHistory.textContent = '';
            return;
        }

        // Operator keys
        if (['add', 'subtract', 'multiply', 'divide', 'percent'].includes(action)) {
            if (firstValue === null) {
                firstValue = parseFloat(displayOutput.textContent);
            } else if (operator) {
                const result = performCalculation(firstValue, operator, parseFloat(displayOutput.textContent));
                firstValue = result;
                displayOutput.textContent = result;
            }

            operator = action;
            waitingForSecondValue = true;
            displayHistory.textContent = firstValue + ' ' + value;
        }
    };

    const performCalculation = (num1, operator, num2) => {
        let result;
        switch (operator) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                result = num1 / num2;
                break;
            case 'percent':
                result = num1 / 100;
                break;
            default:
                return num2;
        }
        return Math.round(result * 10000) / 10000;
    };

    const updateDisplay = () => {
        // This function is for future potential updates, currently done within handlers.
    };
});
