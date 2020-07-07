'use strict';

(function () {
  var WIDTH_MAP_PIN = 62;
  var HEIGHT_OFFSET = 22;
  var HEIGHT_MAP_PIN = 62;

  var createMapPin = function (pin, template) {
    var mapPinElement = template.cloneNode(true);

    mapPinElement.style.left = pin.location.x + (WIDTH_MAP_PIN / 2) + 'px';
    mapPinElement.style.top = pin.location.y - (HEIGHT_OFFSET + HEIGHT_MAP_PIN) + 'px';
    mapPinElement.querySelector('img').src = pin.author.avatar;
    mapPinElement.querySelector('img').alt = pin.offer.title;

    return mapPinElement;
  };

  var createMapPins = function (array, template) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createMapPin(array[i], template));
    }

    return fragment;
  };

  var addMapPinElements = function (array) {
    var mapPinsBlock = window.map.mapBlock.querySelector('.map__pins');

    var mapPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    mapPinsBlock.appendChild(createMapPins(array, mapPin));
  };

  window.pin = {
    addMapPinElements: addMapPinElements
  };
})();
