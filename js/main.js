'use strict';

(function () {
  var deactiveMap = window.map.deactiveMap;
  var activeMap = window.map.activeMap;

  var mainMapPin = document.querySelector('.map__pin--main');

  var getActiveMode = function (evt) {
    var buttonPressed = evt.button;
    if (buttonPressed === 0) {
      activeMap();

      mainMapPin.removeEventListener('mousedown', getActiveMode);
    }
  };

  mainMapPin.addEventListener('mousedown', getActiveMode);

  deactiveMap();

  mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activeMap();
    }
  });
})();


