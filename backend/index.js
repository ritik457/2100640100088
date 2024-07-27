const express = require('express');
const axios = require('axios');

const app = express();
const port= 9876;
const WINDOW_SIZE = 10;
let numbers = [];

// Function to fetch numbers from the third-party server
async function fetchNumbers(numberId) {
    try {
        const response = await axios.get('http://localhost:9876/numbers/e');
        return
        response.data.numbers;
    } catch (error) {
        return [];
    }
}

// Function to update the window and calculate average
function updateWindow(newNumbers) {
    const uniqueNumbers = Array.from(new Set([...numbers, ...newNumbers]));
    numbers = uniqueNumbers.slice(-WINDOW_SIZE);
    const avg = numbers.length ? (numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(2) : 0;
    return { numbers, avg };
}

app.get('/numbers/:id', async (req, res) => {
    const numberId = req.params.id;
    if (!['p', 'f', 'e', 'r'].includes(numberId)) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    const newNumbers = await fetchNumbers(numberId);
    if (!newNumbers.length) {
        return res.status(500).json({ error: 'Failed to fetch numbers' });
    }

    const windowPrevState = [...numbers];
    const { numbers: windowCurrState, avg } = updateWindow(newNumbers);

    res.json({
        windowPrevState,
        windowCurrState,
        numbers: newNumbers,
        avg
    });
});

app.listen(port , () => {
    console.log("port",port);
});