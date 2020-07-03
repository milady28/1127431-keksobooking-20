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

  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (arrayWithElements) {
    var randomIndex = getRandomInRange(0, arrayWithElements.length - 1);
    return arrayWithElements[randomIndex];
  };

  var getArrayWithRandomElements = function (originalArray) {
    var newArray = [];
    var arrayCopy = originalArray.slice();

    for (var i = 0; i <= getRandomInRange(0, originalArray.length - 1); i++) {
      var randomElement = getRandomElement(arrayCopy);
      newArray.push(randomElement);
      arrayCopy.splice(arrayCopy.indexOf(randomElement), 1);
    }

    return newArray;
  };

  var addDisabledAttribute = function (collect) {
    for (var i = 0; i < collect.length; i++) {
      collect[i].disabled = true;
    }
  };

  var removeDisabledAttribute = function (collect) {
    for (var i = 0; i < collect.length; i++) {
      collect[i].disabled = false;
    }
  };

  window.main = {
    getRandomInRange,
    getRandomElement,
    getArrayWithRandomElements,
    addDisabledAttribute,
    removeDisabledAttribute
  };
})();


