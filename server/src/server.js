"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: '*' } });
const pwdToName = { blue: 'Alice', red: 'Bob', green: 'Charlie' };
io.use((socket, next) => {
    const { password } = socket.handshake.auth;
    if (!password || !pwdToName[password])
        return next(new Error('invalid_password'));
    socket.data.user = pwdToName[password];
    next();
});
io.on('connection', (socket) => {
    const name = socket.data.user;
    console.log(`${name} connected`);
    socket.on('message', (msg) => {
        io.emit('message', { user: name, message: msg });
    });
});
server.listen(3000, () => console.log('Server up on 3000'));
