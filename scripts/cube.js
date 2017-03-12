console.log('cube js is loaded!');
console.log('THREE', THREE);
window.elementWorld = [];


window.onload = init;



function init() {

  const scene = document.querySelector('a-scene');
  const sky = document.querySelector('a-sky')
  const assets = document.querySelectorAll('.background')

  document.querySelector('#changeback').onclick = () => {
    next(sky, assets)
  }

}

function next(sky, assets) {
  let asset;
  let assetCube;
  let i = 0
  let skySrc = sky.getAttribute('src').substring(1);

  assets.forEach(a => {
    let src = a.getAttribute('src').substring(4)
    src = src.substring(0, src.length - 4)
    if (src === skySrc) {
      if (i < assets.length - 1) {
        asset = assets[i + 1].getAttribute('src')
        asset = asset.substring(4)
        asset = asset.substring(0, asset.length - 4)
        if (i < assets.length - 2)
          assetCube = assets[i + 2].getAttribute('src').substring(4);
        else
          assetCube = assets[0].getAttribute('src').substring(4);

      } else {
        asset = assets[0].getAttribute('src')
        asset = asset.substring(4)
        asset = asset.substring(0, asset.length - 4)
        assetCube = assets[i + 1].getAttribute('src').substring(4);
      }
      assetCube = assetCube.substring(0, asset.length - 4)

    }
    i++
  })
  if (asset)  {
    console.log('assetCube : ', assetCube);
    sky.setAttribute('src', '#' + asset)
    document.querySelector('.'+asset).setAttribute('src', '#link_to_'+ assetCube)
  }
}

AFRAME.registerComponent('rotate-on-enter', {
  schema: {
    true: { default: true }
  },
  init: function () {
    window.elementWorld.push(this);

    this.el.addEventListener('mouseenter', function () {
      var y = this.getAttribute('rotation').y;
      // rot_anim.setAttribute('from','0 '+y+' 0');
      this.setAttribute('rotation', '0 ' + y + ' 0');

      this.emit('letsRotate');
    });

    this.el.addEventListener('mouseleave', function () {
      this.emit('stopRotate')

    });

    this.el.addEventListener('click', function () {
      console.log('click!')
        if ( this == document.querySelector('#box_update')) {
          var sky = document.querySelector('a-sky')
          var assets = document.querySelectorAll('.background')
          console.log('here');
          console.log('assets : ', assets);
          next(sky, assets)

            // document.querySelector('a-sky').setAttribute('src', '#Place_d_Arme_1');
        }


    });



  }
});
