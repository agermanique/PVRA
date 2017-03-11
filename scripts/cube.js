console.log('cube js is loaded!');
console.log('THREE',THREE);

window.onload = init;


function init() {
  const scene = document.querySelector('a-scene');

      if (scene.hasLoaded) {
        // run();
      } else {
        scene.addEventListener('loaded', run);
      }

      
}


  AFRAME.registerComponent('rotate-on-enter', {
    schema: {
      true: {default: true}
    },
    init: function () {
      window.cube=this;

      this.el.addEventListener('mouseenter', function () {
          this.setAttribute('rotation',this.getAttribute('rotation'));
          this.emit('letsRotate');          
      });

      this.el.addEventListener('mouseleave', function() {
        rot_anim.stop();
      })
    }
  });

