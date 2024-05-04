const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const sessionMiddleware = require("../Middlewares/sessionMiddleware")


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.use((socket, next) => {
    const cookie = socket.handshake.headers.cookie;
    const sessionId = cookie.split(';').find(c => c.trim().startsWith('connect.sid='));

    if (sessionId) {
        const id = sessionId.split('=')[1];
        socket.request.headers.cookie = `connect.sid=${id}`;
        sessionMiddleware(socket.request, {}, next);
    } else {

        return next(new Error('Session ID not found'));
    }
});

module.exports = { app, server, io };
