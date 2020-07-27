'use strict';

(function () {
  var activeForm = window.form.activeForm;
  var unactiveForm = window.form.unactiveForm;
  var validForm = window.form.validForm;

  var createMapPins = window.pin.createMapPins;
  var createMapCard = window.card.createMapCard;

  var onMapPinMousedown = window.pinMoving.onMapPinMousedown;

  var loadFunction = window.load.loadFunction;

  var offerFilter = window.filter.offerFilter;

  var debounce = window.debounce.debounceFunction;

  var mapBlock = document.querySelector('.map');
  var mapPinsBlock = mapBlock.querySelector('.map__pins');
  var mainMapPin = mapBlock.querySelector('.map__pin--main');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var mapFiltersForm = document.querySelector('.map__filters');
  var selectFilters = mapFiltersForm.querySelectorAll('.map__filter');
  var inputFilters = mapFiltersForm.querySelectorAll('.map__checkbox');

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

  var addMapPinElement = function (mapCards) {
    var cardElements = createMapPins(mapCards, mapPinTemplate, onMapPinClick);

    mapPinsBlock.appendChild(cardElements);
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

    var getFilterValue = function (filter, value) {
      filter = value;
      debounce(updateCards);
    };

    selectFilters.forEach(function (element) {
      element.addEventListener('change', function (evt) {
        getFilterValue(element.value, evt.target.value);
      });
    });

    inputFilters.forEach(function (element) {
      element.addEventListener('change', function () {
        getFilterValue(element, element.checked);
      });
    });

    var updateCards = function () {
      var filteredCards = cards.filter(offerFilter);

      removeMapPins();
      closePopup();

      var uniqueCards = filteredCards.filter(function (it, i) {
        return filteredCards.indexOf(it) === i;
      });

      addMapPinElement(uniqueCards);
    };

    var cards = [];

    var successHandler = function (mapCards) {
      cards = mapCards;
      updateCards(cards);
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
