'use strict';

(function () {
  var mapBlock = document.querySelector('.map');

  var createMapPin = function (pin, template) {
    var mapPinElement = template.cloneNode(true);

    mapPinElement.style.left = pin.location.x + (window.const.WIDTH_MAP_PIN / 2) + 'px';
    mapPinElement.style.top = pin.location.y - (window.const.HEIGHT_OFFSET + window.const.HEIGHT_MAP_PIN) + 'px';
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

  window.addMapPinElements = function () {
    var mapPinsBlock = mapBlock.querySelector('.map__pins');

    var mapPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    mapPinsBlock.appendChild(createMapPins(window.cardsArray, mapPin));
  };
})();
