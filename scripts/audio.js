

class Audio {

    constructor() {
        this.player = document.getElementById('player');
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.player;
        this.audioCtx;
        this.analyser;
        this.drawVisual;
        this.dataArray
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.minDecibels = -90;
        this.analyser.maxDecibels = -10;
        this.analyser.smoothingTimeConstant = 0.85;
        this.bufferLength
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(this.handleSuccess.bind(this))
    }



    handleSuccess(stream) {
        // if (window.URL) {
        //     player.src = window.URL.createObjectURL(stream);
        // } else {
        //     player.src = stream;
        // }
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
        // canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        // canvasCtx.beginPath();

        // var sliceWidth = WIDTH * 1.0 / bufferLength;
        // var x = 0;
        console.log(this.dataArray)

        for (var i = 0; i < this.bufferLength; i++) {

            var v = this.dataArray[i] / 128.0;

            // var y = v * HEIGHT / 2;

            // if (i === 0) {
            //     canvasCtx.moveTo(x, y);
            // } else {
            //     canvasCtx.lineTo(x, y);
            // }

            // x += sliceWidth;
        }

    }
}
var audio = new Audio()
