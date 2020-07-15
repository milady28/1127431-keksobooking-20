'use strict';
(function () {
  var mapPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map__pins');

  var addressInput = document.querySelector('#address');

  var MAP_LIMITS = {
    minY: 130,
    maxY: 630
  };

  var limits = {
    top: map.offsetTop + MAP_LIMITS.minY,
    right: map.offsetWidth - mapPin.offsetWidth,
    bottom: MAP_LIMITS.maxY,
    left: map.offsetLeft
  };

  var pinMovingListener = function () {
    mapPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      mapPin.style.zIndex = 9999;

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

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
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (startCoords.x > limits.right) {
          var moveX = limits.right;
          startCoords.x = moveX;
        } else if (startCoords.x > limits.left) {
          moveX = startCoords.x;
          mapPin.style.left = moveX + 'px';
        }

        if (startCoords.y > limits.bottom) {
          var moveY = limits.bottom;
          startCoords.y = moveY;
        } else if (startCoords.y > limits.top) {
          moveY = startCoords.y;
          mapPin.style.top = moveY + 'px';
        }

        addressInput.value = Math.round(moveX) + ', ' + Math.round(moveY);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.pinMoving = {
    pinMovingListener: pinMovingListener
  };
})();
