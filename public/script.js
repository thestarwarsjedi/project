const socket = io();

socket.on('connect', () => {
    console.log('client: client connected to server');
    socket.emit('request-existing-users', '');
    // socket.emit('stream', 'streaming');
});

socket.on('another-user-connected', (data) => {
    console.log(data);
    const video = document.createElement('video');
    document.body.appendChild(video);
});

socket.on('requested-existing-users', (numberOfUsers) => {

    for(let i = 0; i < numberOfUsers; i++) {
        const video = document.createElement('video');
        document.body.appendChild(video);
    }

});

navigator.mediaDevices.getUserMedia({audio: false, video: true})
    .then((mediaStream) => {
        const video = document.createElement('video');
        document.body.appendChild(video);
        video.srcObject = mediaStream;
        console.log('video.srcObject:');
        console.log(video.srcObject);

        // works w/o this line... don't know if i should add onloadedmetadata
        // video.onloadedmetadata = (e) => {
            video.play();
        // }
    });
