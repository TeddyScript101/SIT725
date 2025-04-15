const express = require('express');
const path = require('path');
const connectDB = require('./db');
const routes = require('./routes');
const http = require('http'); // This stays

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


connectDB();
app.use('/', routes);


const server = http.createServer(app);


const io = require('socket.io')(server);


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

setInterval(() => {
    const number = parseInt(Math.random() * 10);
    io.emit('number', number);
}, 1000);


server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = { app, server };
