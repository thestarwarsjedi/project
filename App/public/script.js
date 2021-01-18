const socket = io();

const peer = new Peer(undefined, {
    host: '/',
    port: '3001', // (server.listen(3001))
    path: '/peerjs', // app.use('/peerjs')
    debug: 3,
    config: {'iceServers': [
        {
            url: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
        }
    ]}
});

const connections = [];

peer.on('open', (peerId) => {
    socket.emit('peer-id', peerId);
});

// Outbound connection
socket.on('available-peer', (peerId) => {
    const connection = peer.connect(peerId);

    connections.push(connection);

    connection.on('open', () => {
        connection.send('Stranger has connected a.');
    });

    connection.on('data', (data) => {
        outputMessage('Stranger: ' + data + ' 1');
    });
});

// Inbound connection
peer.on('connection', (connection) => {
    connections.push(connection);

    connection.on('open', () => {
        connection.send('Stranger has connected b.');
    });

    connection.on('data', (data) => {
        outputMessage('Stranger: ' + data + ' 2');
    });
});

const chatForm  = document.getElementById('chat-form');
const textInput = document.getElementById('text-input');

chatForm.addEventListener('submit', (e) => {
    outputMessage('You: ' + textInput.value);

    // Emit message
    connections.forEach(connection => {
        connection.send(textInput.value);
    });

    // Clear Input
    textInput.value = '';
    textInput.focus();
});

function outputMessage (message){
    const h1 = document.createElement('h1');
    h1.innerText = message;
    document.body.appendChild(h1);
}
