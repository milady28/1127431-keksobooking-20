'use strict';

(function () {
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

  window.addFunction = {
    getRandomInRange: getRandomInRange,
    getRandomElement: getRandomElement,
    getArrayWithRandomElements: getArrayWithRandomElements
  };
})();
