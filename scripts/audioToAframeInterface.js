class AudioToAframe {
    constructor() {
        this.drawVisual 
        this.init()
    }
    init() {
        console.log('init')
        this.drawVisual = requestAnimationFrame(this.convert.bind(this));

    }
    convert() {
        if (window.audio && window.cube) {
            window.cube.setAttribute('scale', { x: window.audio.outputArray[0], y: window.audio.outputArray[15], x: window.audio.outputArray[30] });
        }
        console.log("convert")
    }

}
window.audio = new AudioToAframe()