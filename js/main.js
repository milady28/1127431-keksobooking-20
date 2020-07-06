'use strict';

(function () {
  var mainMapPin = document.querySelector('.map__pin--main');

  window.deactiveMap();

  mainMapPin.addEventListener('mousedown', function (evt) {
    var buttonPressed = evt.button;
    if (buttonPressed === 0) {
      window.activeMap();
    }
  });

  mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.map.activeMap();
    }
  });
})();


