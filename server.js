// Packages
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { v4: uuidv4 } = require('uuid');
app.set('view engine', 'ejs');
app.use(express.static('public'));


let sockets = [];


// IO
io.on('connection', (socket) => {
    sockets.push(socket);
    // console.log('======');
    // console.log(sockets);
    // console.log('======');

    console.log(`server: ${socket.id} connected`);
    socket.broadcast.emit('another-user-connected', `${socket.id} connected`);

    socket.on('request-existing-users', () => {
        // if anyone else in room, display
        if(sockets.length > 1) {
            const otherUsers = sockets.filter(element => element.id !== socket.id);
            io.to(socket.id).emit('requested-existing-users', otherUsers.length);
            console.log('something');
        }
        else {
            console.log('none');
        }
    });
});


// Routes
app.get('/', (req, res) => {
    res.render('room');
});


// Server
server.listen(3000);
