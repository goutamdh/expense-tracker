const app = require('./src/app');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

const onlineUsers = new Set();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    onlineUsers.add(socket.id);
    io.emit('online-users', Array.from(onlineUsers));

    socket.on('disconnect', () => {
        onlineUsers.delete(socket.id);
        io.emit('online-users', Array.from(onlineUsers));
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
