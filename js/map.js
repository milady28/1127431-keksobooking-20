'use strict';

(function () {
  var mapCardArray = window.pin.generateCardsArray;
  var addMapPinElements = window.pin.addMapPinElements;
  var addMapCardElements = window.pin.addMapCardElements;

  var activeForm = window.form.activeForm;
  var unactiveForm = window.form.unactiveForm;
  var validForm = window.form.validForm;

  var mapBlock = document.querySelector('.map');
  var mapPins = mapBlock.querySelectorAll('.map__pin');

  var mapPinClickEvent = function (array, element) {
    array.addEventListener('click', function (evt) {
      evt.preventDefault();

      var mapCard = mapBlock.querySelector('.map__card');

      var popup = mapBlock.querySelector('.popup');
      var popupBtnClose = popup.querySelector('.popup__close');

      if (mapCard) {
        mapBlock.removeChild(mapCard);
      }

      addMapCardElements;

      var onPopupEscPress = function (evt1) {
        if (evt1.key === 'Escape') {
          evt1.preventDefault();
          closePopup();
        }
      };

      var closePopup = function () {
        mapBlock.removeChild(popup);

        document.removeEventListener('keydown', onPopupEscPress);
      };

      document.addEventListener('keydown', onPopupEscPress);

      popupBtnClose.addEventListener('click', function (evt2) {
        evt2.preventDefault();
        closePopup();
      });
    });
  };

  var activeMap = function () {
    mapBlock.classList.remove('map--faded');
    adFormBlock.classList.remove('ad-form--disabled');

    activeForm;
    validForm;

    addMapPinElements;

    var adFormBlock = document.querySelector('.ad-form');

    for (var i = 1; i < mapPins.length; i++) {
      mapPinClickEvent(mapPins[i], mapCardArray[i - 1]);
    }
  };

  var deactiveMap = function () {
    mapBlock.classList.add('map--faded');
    adFormBlock.classList.add('ad-form--disabled');

    unactiveForm;
  };

  window.map = {
    activeMap,
    deactiveMap
  }
})();
