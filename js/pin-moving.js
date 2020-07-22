'use strict';

(function () {
  var mapPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map__pins');

  var addressInput = document.querySelector('#address');

  var MAP_LIMITS = {
    top: 130,
    right: map.offsetLeft + map.offsetWidth - mapPin.offsetWidth,
    bottom: 630,
    left: map.offsetLeft
  };

  var pinMovingListener = function () {
    mapPin.addEventListener('mousedown', function (evt) {
      var coordsMax = document.documentElement.scrollWidth;
      var coordsHeightMax = document.documentElement.scrollTop + document.documentElement.clientHeight - mapPin.offsetHeight;
      var shiftX = evt.pageX - mapPin.offsetLeft;
      var shiftY = evt.pageY - mapPin.offsetTop;

      mapPin.style.position = 'absolute';

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

        if (coordX < MAP_LIMITS.left) {
          coordX = MAP_LIMITS.left;
        }

        if (coordX > MAP_LIMITS.right) {
          coordX = MAP_LIMITS.right;
        }

        if (coordX + mapPin.offsetWidth > coordsMax) {
          coordX = coordsMax - mapPin.offsetWidth;
        } else {
          mapPin.style.left = coordX + 'px';
        }

        if (coordY < MAP_LIMITS.top) {
          coordY = MAP_LIMITS.top;
        }

        if (coordY > MAP_LIMITS.bottom) {
          coordY = MAP_LIMITS.bottom;
        }

        if (coordY > coordsHeightMax) {
          document.documentElement.scrollTop += 20;
        } else {
          mapPin.style.top = coordY + 'px';
        }

        addressInput.value = Math.round(coordX) + ', ' + Math.round(coordY);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.pinMoving = {
    pinMovingListener: pinMovingListener
  };
})();
