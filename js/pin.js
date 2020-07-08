'use strict';

(function () {
  var WIDTH_MAP_PIN = 62;
  var HEIGHT_OFFSET = 22;
  var HEIGHT_MAP_PIN = 62;

  var createMapPin = function (pin, template, addFunction, mapBlock) {
    var mapPinElement = template.cloneNode(true);

    mapPinElement.style.left = pin.location.x + (WIDTH_MAP_PIN / 2) + 'px';
    mapPinElement.style.top = pin.location.y - (HEIGHT_OFFSET + HEIGHT_MAP_PIN) + 'px';
    mapPinElement.querySelector('img').src = pin.author.avatar;
    mapPinElement.querySelector('img').alt = pin.offer.title;

    mapPinElement.addEventListener('click', function (evt) {
      evt.preventDefault();

      var onPopupEscPress = function (evt1) {
        if (evt1.key === 'Escape') {
          evt1.preventDefault();

          closePopup();
        }
      };

      var closePopup = function () {
        var popup = mapBlock.querySelector('.popup');
        mapBlock.removeChild(popup);

        document.removeEventListener('keydown', onPopupEscPress);
      };

      var mapCard = mapBlock.querySelector('.map__card');

      if (mapCard) {
        closePopup();
      }

      addFunction(pin);

      document.addEventListener('keydown', onPopupEscPress);

      var popupBtnClose = mapBlock.querySelector('.popup__close');

      popupBtnClose.addEventListener('click', function (evt2) {
        evt2.preventDefault();
        closePopup();
      });
    });

    return mapPinElement;
  };

  var createMapPins = function (array, template, addFunction, mapBlock) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createMapPin(array[i], template, addFunction, mapBlock));
    }

    return fragment;
  };

  window.pin = {
    createMapPins: createMapPins
  };
})();
