console.log('cube js is loaded!');
console.log('THREE',THREE);

  AFRAME.registerComponent('scale-on-click', {
    schema: {
      to: {default: '2.5 2.5 2.5'}
    },
    init: function () {
      var data = this.data;
      var isAnimationStarted = false;

      this.el.addEventListener('animationstart', function() {
          isAnimationStarted = true;
          console.log('animation started!');
      })

      this.el.addEventListener('animationend', function() {
        isAnimationStarted = false;
        // box.emit('letsRotate');        
        console.log('animation end');     
      })

      this.el.addEventListener('click', function () {
        if(!isAnimationStarted) {
          box.emit('letsRotate');          
        }

        // box.emit('letsRotate'); 
            
        console.log('this : ', this);
      });
    }
  });

