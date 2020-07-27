'use strict';

(function () {
  var MainPinSize = {
    WIDTH: 62,
    HEIGHT: 62,
    POINTER_HEIGHT: 22
  };

  var createMapPin = function (pin, template, onMapPinClick) {
    var mapPinElement = template.cloneNode(true);

    mapPinElement.style.left = pin.location.x + (MainPinSize.WIDTH / 2) + 'px';
    mapPinElement.style.top = pin.location.y - (MainPinSize.POINTER_HEIGHT + MainPinSize.HEIGHT) + 'px';
    mapPinElement.querySelector('img').src = pin.author.avatar;
    mapPinElement.querySelector('img').alt = pin.offer.title;

    onMapPinClick(pin, mapPinElement);

    return mapPinElement;
  };

  var createMapPins = function (array, template, onMapPinClick) {
    var fragment = document.createDocumentFragment();

    array.slice(0, 5).forEach(function (pin) {
      fragment.appendChild(createMapPin(pin, template, onMapPinClick));
    });

    return fragment;
  };

  window.pin = {
    createMapPins: createMapPins
  };
})();
