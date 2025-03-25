const express = require('express');
const path = require('path');
const connectDB = require('./db');
const Cards = require('./models/card');

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

connectDB();

app.get('/cards', async (req, res) => {
    try {
        const users = await Cards.find();
        res.json({ data: users });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
