const express        = require('express');
const http           = require('http')
const socketIO       = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app            = express();
const server         = http.createServer(app);
const io             = socketIO(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log(`server: ${socket.id} has connected`);

    socket.on('peer-id', (peerId) => {
        console.log('server: PeerId created: ' + peerId);
        socket.broadcast.emit('available-peer', peerId);
    });
});

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

app.get('/:roomId', (req, res) => {
    res.render('room.ejs');
});

server.listen('3000');
