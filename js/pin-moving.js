'use strict';

(function () {
  var addressInput = document.querySelector('#address');

  var PIN_WEIGHT = 62;

  var onMapPinMousedown = function (mainMapPin, mapPin, mapLimit) {
    mainMapPin.addEventListener('mousedown', function (evt) {
      var coordsMax = document.documentElement.scrollWidth;
      var coordsHeightMax = document.documentElement.scrollTop + document.documentElement.clientHeight - mapPin.offsetHeight;
      var shiftX = evt.pageX - mainMapPin.offsetLeft;
      var shiftY = evt.pageY - mainMapPin.offsetTop;

      mainMapPin.style.position = 'absolute';

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        movePin(moveEvt);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      var movePin = function (moveEvt) {
        var coordX = moveEvt.pageX - shiftX;
        var coordY = moveEvt.pageY - shiftY;

        if (coordX < mapLimit.left) {
          coordX = mapLimit.left;
        }

        if (coordX > mapLimit.right) {
          coordX = mapLimit.right;
        }

        if (coordX + mainMapPin.offsetWidth > coordsMax) {
          coordX = coordsMax - mainMapPin.offsetWidth;
        } else {
          mainMapPin.style.left = coordX + 'px';
        }

        if (coordY < mapLimit.top) {
          coordY = mapLimit.top;
        }

        if (coordY > mapLimit.bottom) {
          coordY = mapLimit.bottom;
        }

        if (coordY > coordsHeightMax) {
          document.documentElement.scrollTop += 20;
        } else {
          mainMapPin.style.top = coordY + 'px';
        }

        addressInput.value = Math.round(coordX) + ', ' + Math.round(coordY);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.pinMoving = {
    onMapPinMousedown: onMapPinMousedown
  };
})();
