'use strict';

(function () {
  var deactiveMap = window.map.deactiveMap;
  var activeMap = window.map.activeMap;

  var mainMapPin = document.querySelector('.map__pin--main');

  deactiveMap();

  mainMapPin.addEventListener('mousedown', function (evt) {
    var buttonPressed = evt.button;
    if (buttonPressed === 0) {
      activeMap();
    }
  });

  mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activeMap();
    }
  });
})();


