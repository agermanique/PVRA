
var video = document.querySelector("#videoElement");

class Audio {

    constructor() {
        this.player = document.getElementById('player');
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.player;
        this.audioCtx;
        this.analyser;
        this.drawVisual;
        this.dataArray;
        this.outputArray
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.minDecibels = -90;
        this.analyser.maxDecibels = -10;
        this.analyser.smoothingTimeConstant = 0.85;
        this.bufferLength

        navigator.mediaDevices.getUserMedia({ audio: true, video: { facingMode: { exact: "environment" } } })
            .then(this.handleSuccess.bind(this))
    }



    handleSuccess(stream) {
        // if (window.URL) {
        //     player.src = window.URL.createObjectURL(stream);
        // } else {
        //     player.src = stream;
        // }
        video.src = window.URL.createObjectURL(stream);
        setInterval(getAverageRGB, 500)
        var input = this.audioCtx.createMediaStreamSource(stream)
        var processor = this.audioCtx.createScriptProcessor(1024, 1, 1);

        input.connect(this.analyser);
        this.analyser.connect(processor)
        processor.connect(this.audioCtx.destination);

        // processor.onaudioprocess = function (e) {
        //     // Do something with the data, i.e Convert this to WAV
        //     // console.log(e.target.audioCtx.listener.forwardX.value);

        // };
        this.visualize();

    };

    visualize() {
        this.analyser.fftSize = 32;
        this.bufferLength = this.analyser.fftSize;
        console.log(this.bufferLength);
        this.dataArray = new Uint8Array(this.bufferLength);

        this.draw()
    }
    draw() {

        this.drawVisual = requestAnimationFrame(this.draw.bind(this));

        this.analyser.getByteTimeDomainData(this.dataArray);

        // canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        // canvasCtx.fillRect(0, 0, WIDTH, HEIGHT); 

        // canvasCtx.lineWidth = 2;
        // canvasCtx.strokeStyle = 'rgb(0, 0, 0)';S

        // canvasCtx.beginPath();

        // var sliceWidth = WIDTH * 1.0 / bufferLength;
        // var x = 0;
        // console.log(this.dataArray)
        this.outputArray = []
        for (var i = 0; i < this.bufferLength; i++) {

            this.outputArray.push(this.dataArray[i] / 128.0)


            // var y = v * HEIGHT / 2;

            // if (i === 0) {
            //     canvasCtx.moveTo(x, y);
            // } else {
            //     canvasCtx.lineTo(x, y);
            // }

            // x += sliceWidth;
        }
        //console.log(this.outputArray)
        if (window.audio && window.cube) {
            //console.log({ x: Math.round(this.outputArray[0] * 10), y: Math.round(this.outputArray[15] * 10), z: Math.round(this.outputArray[30] * 10) })
            //console.log(`#${Math.round(this.outputArray[0] * 5)}${Math.round(this.outputArray[15] * 5)}${Math.round(this.outputArray[30] * 5)}`)
            // let rotate = window.cube.el.getAttribute('rotation')
            // window.cube.el.setAttribute('rotation', { x: rotate.x, y: rotate.y, z: rotate.z  + Math.round(this.outputArray[15])});            
            window.cube.el.setAttribute('scale', { x: this.outputArray[0] * 5, y: this.outputArray[16] * 5, z: this.outputArray[30] * 5 });

            window.cube.el.setAttribute('color', `#${Math.round(this.outputArray[0] * 6)}${Math.round(this.outputArray[15] * 6)}${Math.round(this.outputArray[30] * 6)}`);


        }
    }
}
window.audio = new Audio()
var imgEl = document.getElementById('videoElement')

function getAverageRGB() {
    if (imgEl) {
        console.log("start")
        var blockSize = 5, // only visit every 5 pixels
            defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = { r: 0, g: 0, b: 0 },
            count = 0;

        if (!context) {
            return defaultRGB;
        }

        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

        context.drawImage(imgEl, 0, 0);

        try {
            data = context.getImageData(0, 0, width, height);
        } catch (e) {
        /* security error, img on diff domain */alert('x');
            return defaultRGB;
        }

        length = data.data.length;

        while ((i += blockSize * 4) < length) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i + 1];
            rgb.b += data.data[i + 2];
        }

        // ~~ used to floor values
        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);
        sineWaveRed.frequency = rgb.r * 2
        sineWaveBlue.frequency = rgb.b * 2
        sineWaveGreen.frequency = rgb.g * 2
        return rgb;
    }

}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

// if (navigator.getUserMedia) {
//     navigator.getUserMedia({ video: true }, handleVideo, videoError);
// }

function handleVideo(stream) {

}

function videoError(e) {
    // do something
}
var sineWaveRed = new Pizzicato.Sound({
    source: 'wave',
    options: {
        frequency: 220,
        volume: 0.5,
        bufferSize: 2048
    }
});
var sineWaveGreen = new Pizzicato.Sound({
    source: 'wave',
    options: {
        frequency: 220,
        volume: 0.5,
        bufferSize: 2048

    }
});
var sineWaveBlue = new Pizzicato.Sound({
    source: 'wave',
    options: {
        frequency: 220,
        bufferSize: 2048

    }
});


sineWaveBlue.play();
sineWaveGreen.play();
sineWaveRed.play();
