const express = require('express');
const port = 80;
const http = require('http');
const app = express();
const server = http.createServer(app).listen(port);
const io = require('socket.io')(server);

var postMessage = [];

app.use(express.static("./public"));


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

io.on("connection", function (socket) {

    function sendData() {
        socket.emit("message", getRandomInt(75, 95));
    };

    setInterval(sendData, 1000);

    socket.on("chat", function (message) {
        socket.broadcast.emit("message", message);
    });

    socket.on("postMessage", function (message) {
        postMessage.push(message);
        console.log(postMessage);
        socket.broadcast.emit("postMessage", message);
    });

});

console.log("Server running...");