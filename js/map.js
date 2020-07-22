'use strict';

(function () {
  var activeForm = window.form.activeForm;
  var unactiveForm = window.form.unactiveForm;
  var validForm = window.form.validForm;

  var createMapPins = window.pin.createMapPins;
  var createMapCard = window.card.createMapCard;

  var onMapPinMousedown = window.pinMoving.onMapPinMousedown;

  var loadFunction = window.load.loadFunction;

  var mapBlock = document.querySelector('.map');
  var mapPinsBlock = mapBlock.querySelector('.map__pins');
  var mainMapPin = mapBlock.querySelector('.map__pin--main');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var offerCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var MAP_LIMITS = {
    top: 130,
    right: mapPinsBlock.offsetLeft + mapPinsBlock.offsetWidth - mainMapPin.offsetWidth,
    bottom: 630,
    left: mapPinsBlock.offsetLeft
  };

  var addMapCardElement = function (element) {
    mapBlock.insertBefore(createMapCard(element, offerCardTemplate), mapFiltersContainer);
  };

  var addMapPinElements = function (elements) {
    mapPinsBlock.appendChild(elements);
  };

  var onPopupEscPress = function (pressEvt) {
    if (pressEvt.key === 'Escape') {
      pressEvt.preventDefault();

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

  var onMapPinClick = function (pin, element) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();

      var mapCard = mapBlock.querySelector('.map__card');

      if (mapCard) {
        closePopup();
      }

      addMapCardElement(pin);

      document.addEventListener('keydown', onPopupEscPress);

      var popupButtonClose = mapBlock.querySelector('.popup__close');

      popupButtonClose.addEventListener('click', function (clickEvt) {
        clickEvt.preventDefault();
        closePopup();
      });
    });
  };

  var getActiveMode = function (evt) {
    var buttonPressed = evt.button;
    if (buttonPressed === 0) {
      activeMap();
    }
  };

  var removeMapPins = function () {
    var mapPins = mapBlock.querySelectorAll('.map__pin');

    if (mapPins.length > 1) {
      for (var i = 1; i < mapPins.length; i++) {
        mapPinsBlock.removeChild(mapPins[i]);
      }
    }
  };

  var activeMap = function () {
    mapBlock.classList.remove('map--faded');

    activeForm();
    validForm();

    mainMapPin.removeEventListener('mousedown', getActiveMode);

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

    var housingType = document.querySelector('#housing-type');

    var addMapPinElement = function (mapCards) {
      var cardElements = createMapPins(mapCards, mapPinTemplate, onMapPinClick);

      addMapPinElements(cardElements);
    };

    var getFilteredMapPins = function (mapCards) {
      housingType.addEventListener('change', function () {
        if (housingType.value !== 'any') {
          removeMapPins();

          closePopup();

          var updateMapCards = mapCards.
          filter(function (card) {
            return card.offer.type === housingType.value;
          }).
          map(function (card) {
            return card;
          });

          addMapPinElement(updateMapCards);
        } else {
          addMapPinElement(mapCards);
        }
      });
    };

    var successHandler = function (mapCards) {
      getFilteredMapPins(mapCards);

      addMapPinElement(mapCards);
    };

    loadFunction(successHandler, errorHandler);

    onMapPinMousedown(mainMapPin, mapPinTemplate, MAP_LIMITS);
  };

  var deactiveMap = function () {
    mapBlock.classList.add('map--faded');

    mainMapPin.addEventListener('mousedown', getActiveMode);

    unactiveForm(mainMapPin);

    removeMapPins();
    closePopup();
  };

  window.map = {
    activeMap: activeMap,
    deactiveMap: deactiveMap,
    getActiveMode: getActiveMode
  };
})();
