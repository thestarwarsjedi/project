navigator.mediaDevices.getUserMedia({audio: false, video: true})
    .then((mediaStream) => {
        const video = document.querySelector('#video-local');
        video.srcObject = mediaStream;

        // works w/o this line... don't know if i should add onloadedmetadata
        // video.onloadedmetadata = (e) => {
            video.play();
        // }
    });
