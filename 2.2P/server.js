const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());


const validateNumbers = (num1, num2) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    return !isNaN(num1) && !isNaN(num2);
};


app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;
    if (!validateNumbers(num1, num2)) {
        return res.status(400).json({ error: 'Invalid numbers provided' });
    }
    res.json({ result: parseFloat(num1) + parseFloat(num2) });
});


app.post('/calculate', (req, res) => {
    const { operation, num1, num2 } = req.body;
    if (!validateNumbers(num1, num2)) {
        return res.status(400).json({ error: 'Invalid numbers provided' });
    }

    const parsedNum1 = parseFloat(num1);
    const parsedNum2 = parseFloat(num2);
    let result;

    switch (operation) {
        case 'add':
            result = parsedNum1 + parsedNum2;
            break;
        case 'subtract':
            result = parsedNum1 - parsedNum2;
            break;
        case 'multiply':
            result = parsedNum1 * parsedNum2;
            break;
        case 'divide':
            if (parsedNum2 === 0) {
                return res.status(400).json({ error: 'Cannot divide by zero' });
            }
            result = parsedNum1 / parsedNum2;
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation' });
    }

    res.json({ result });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});