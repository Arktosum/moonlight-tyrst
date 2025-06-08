import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
const app = express();


const db = await open({ filename: 'chat.db', driver: sqlite3.Database });
await db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT,
    message TEXT,
    time INTEGER
  );
`);


app.get("/", (req, res) => {
    res.send("<h1>Welcome to the backend!</h1>")
})
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const pwdToName: Record<string, string> = { blue: 'Alice', red: 'Bob', green: 'Charlie' };

io.use((socket, next) => {
    const { password } = socket.handshake.auth as { password?: string };
    if (!password || !pwdToName[password]) return next(new Error('invalid_password'));
    socket.data.user = pwdToName[password];
    next();
});

io.on('connection', async (socket: Socket) => {
    const name = socket.data.user as string;
    const rows = await db.all('SELECT user, message, time FROM messages ORDER BY id');
    socket.emit('history', rows);
    socket.on('user', () => {
        socket.emit('user', { user: name });
    });
    socket.on('message', async (msg: string) => {
        const now = Date.now(); // Unix ms
        await db.run(
            'INSERT INTO messages (user, message, time) VALUES (?, ?, ?)',
            name, msg, now
        );
        io.emit('message', {
            user: socket.data.user,
            message: msg,
            time: now,
        });
    });
});

server.listen(3000, () => console.log('Server up on 3000'));
