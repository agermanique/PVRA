console.log('cube js is loaded!');
// window.onload = init;

// function init() {
//     var boxEl = document.querySelector('#box');
//     console.log('boxEl : ', boxEl);
//   boxEl.addEventListener('click', function () {
//       console.log('teeeeeest');
//     boxEl.setAttribute('scale', {x: 2, y: 2, z: 2});
//   });
//     // boxEl.setAttribute('width', 5);
//     // boxEl.setAttribute('color', '#FFF');
//     // boxEl.addEventListener('click', function () {
//     // // If we are using the cursor component.
//     // console.log('click on box!');
//     // boxEl.setAttribute('color', '#FFF');
//     // });
//     // boxEl.emit('some-event');
//     // boxEl.removeAttribute('color');
//     // boxEl.querySelectorAll('a-sphere');


// }


  AFRAME.registerComponent('scale-on-click', {
    schema: {
      to: {default: '2.5 2.5 2.5'}
    },
    init: function () {
        console.log('init');
      var data = this.data;
      console.log('data :', data);
      this.el.addEventListener('click', function () {
        this.setAttribute('scale', data.to);
        console.log('this : ', this);
        // this.setAttribute('color','#FFF');
        console.log('color : ', this.getAttribute('color'));
      });
    }
  });


  AFRAME.registerComponent('rotate-on-click', {
    schema: {
        to: {default: '360 405 45'}
    },
    init: function () {
        var data = this.data;
        this.el.addEventListener('click', function() {
            this.setAttribute('rotate', data.to);
        })
    }
  })