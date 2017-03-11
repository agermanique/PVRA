console.log('cube js is loaded!');
console.log('THREE',THREE);

window.onload = init;


function init() {
  const scene = document.querySelector('a-scene');


      
}


  AFRAME.registerComponent('rotate-on-enter', {
    schema: {
      true: {default: true}
    },
    init: function () {
      window.cube=this;

      this.el.addEventListener('mouseenter', function () {
          var y = this.getAttribute('rotation').y;
          // rot_anim.setAttribute('from','0 '+y+' 0');
          this.setAttribute('rotation','0 '+y+' 0');
          
          this.emit('letsRotate');          
      });

      this.el.addEventListener('mouseleave', function() {
        // rot_anim.stop();
        this.emit('stopRotate')
        
      })
    }
  });

