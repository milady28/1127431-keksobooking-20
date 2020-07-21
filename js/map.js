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
        if (popup) {
          popup.remove();
        }

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

    var errorHandler = function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    };

    var successHandler = function (cards) {
      var mapCardArray = cards;
      var cardElements = createMapPins(mapCardArray, mapPin, addMapElementsFunction);

      addMapPinElements(cardElements);
    };

    window.load.loadFunction(successHandler, errorHandler);

    addPinMovingListener();
  };

  var deactiveMap = function () {
    mapBlock.classList.add('map--faded');

    var mapPinsBlock = mapBlock.querySelector('.map__pins');
    var mapPins = mapBlock.querySelectorAll('.map__pin');

    unactiveForm();

    if (mapPins.length > 1) {
      for (var i = 1; i < mapPins.length; i++) {
        mapPinsBlock.removeChild(mapPins[i]);
      }
    }
  };

  window.map = {
    activeMap: activeMap,
    deactiveMap: deactiveMap
  };
})();
