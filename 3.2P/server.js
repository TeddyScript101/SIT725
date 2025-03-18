const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
