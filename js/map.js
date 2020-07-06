'use strict';

(function () {
  var mapCardArray = window.card.generateCardsArray();
  var addMapPinElements = window.pin.addMapPinElements;
  var addMapCardElements = window.card.addMapCardElements;

  var activeForm = window.form.activeForm;
  var unactiveForm = window.form.unactiveForm;
  var validForm = window.form.validForm;

  var mapBlock = document.querySelector('.map');

  var adFormBlock = document.querySelector('.ad-form');

  var mapPinClickEvent = function (array, element) {
    array.addEventListener('click', function (evt) {
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
        addMapCardElements(element);
      } else {
        addMapCardElements(element);
      }

      document.addEventListener('keydown', onPopupEscPress);

      var popupBtnClose = mapBlock.querySelector('.popup__close');

      popupBtnClose.addEventListener('click', function (evt2) {
        evt2.preventDefault();
        closePopup();
      });
    });
  };

  var activeMap = function () {
    mapBlock.classList.remove('map--faded');
    adFormBlock.classList.remove('ad-form--disabled');

    activeForm();
    validForm();

    addMapPinElements(mapCardArray);

    var mapPins = mapBlock.querySelectorAll('.map__pin');

    for (var i = 1; i < mapPins.length; i++) {
      mapPinClickEvent(mapPins[i], mapCardArray[i - 1]);
    }
  };

  var deactiveMap = function () {
    mapBlock.classList.add('map--faded');
    adFormBlock.classList.add('ad-form--disabled');

    unactiveForm();
  };

  window.map = {
    activeMap: activeMap,
    deactiveMap: deactiveMap,
    mapCardArray: mapCardArray
  };
})();
