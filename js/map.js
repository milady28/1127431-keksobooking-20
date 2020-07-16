'use strict';

(function () {
  var activeForm = window.form.activeForm;
  var unactiveForm = window.form.unactiveForm;
  var validForm = window.form.validForm;

  var createMapPins = window.pin.createMapPins;
  var createMapCard = window.card.createMapCard;

  var addPinMovingListener = window.pinMoving.pinMovingListener;

  var mapBlock = document.querySelector('.map');

  var offerCard = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var mapPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var addMapCardElements = function (element) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');

    mapBlock.insertBefore(createMapCard(element, offerCard), mapFiltersContainer);
  };

  var addMapPinElements = function (elements) {
    var mapPinsBlock = mapBlock.querySelector('.map__pins');

    mapPinsBlock.appendChild(elements);
  };

  var addMapElementsFunction = function (pin, element) {
    element.addEventListener('click', function (evt) {
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

      addMapCardElements(pin);

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

    activeForm();
    validForm();

    var mapCardArray = window.card.generateCardsArray();

    var cardElements = createMapPins(mapCardArray, mapPin, addMapElementsFunction);

    addMapPinElements(cardElements);

    addPinMovingListener();
  };

  var deactiveMap = function () {
    mapBlock.classList.add('map--faded');

    unactiveForm();
  };

  window.map = {
    activeMap: activeMap,
    deactiveMap: deactiveMap
  };
})();
