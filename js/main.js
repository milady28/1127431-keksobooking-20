'use strict';

(function () {
  var mainMapPin = document.querySelector('.map__pin--main');

  window.map.deactiveMap();

  mainMapPin.addEventListener('mousedown', function (evt) {
    var buttonPressed = evt.button;
    if (buttonPressed === 0) {
      window.map.activeMap();
    }
  });

  mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.map.activeMap();
    }
  });
})();


