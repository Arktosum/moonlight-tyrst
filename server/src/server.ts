import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const pwdToName: Record<string, string> = { blue: 'Alice', red: 'Bob', green: 'Charlie' };

io.use((socket, next) => {
    const { password } = socket.handshake.auth as { password?: string };
    if (!password || !pwdToName[password]) return next(new Error('invalid_password'));
    socket.data.user = pwdToName[password];
    next();
});

io.on('connection', (socket: Socket) => {
    const name = socket.data.user as string;
    console.log(`${name} connected`);

    socket.on('message', (msg: string) => {
        io.emit('message', { user: name, message: msg });
    });
});

server.listen(3000, () => console.log('Server up on 3000'));
