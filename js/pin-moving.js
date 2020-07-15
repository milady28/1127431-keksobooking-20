'use strict';
(function () {
  var small = document.querySelector('.map__pin--main');
  var big = document.querySelector('.map');

  var MAP_LIMITS = {
    minY: 130,
    maxY: 630
  };

  var limits = {
    top: big.offsetTop + MAP_LIMITS.minY,
    right: big.offsetLeft + big.offsetWidth - small.offsetWidth,
    bottom: big.offsetTop + MAP_LIMITS.maxY,
    left: big.offsetLeft
  };

  var pinMovingListener = function () {
    small.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      small.style.zIndex = 9999;

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
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (startCoords.x > limits.right) {
          startCoords.x = limits.right;
        } else if (startCoords.x > limits.left) {
          small.style.left = (small.offsetLeft - shift.x) + 'px';
        }

        if (startCoords.y > limits.bottom) {
          startCoords.y = limits.bottom;
        } else if (startCoords.y > limits.top) {
          small.style.top = (small.offsetTop - shift.y) + 'px';
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.pinMoving = {
    pinMovingListener: pinMovingListener
  };
})();
