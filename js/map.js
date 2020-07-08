'use strict';

(function () {
  var activeForm = window.form.activeForm;
  var unactiveForm = window.form.unactiveForm;
  var validForm = window.form.validForm;

  var createMapPins = window.pin.createMapPins;
  var createMapCard = window.card.createMapCard;

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

  var activeMap = function () {
    mapBlock.classList.remove('map--faded');

    activeForm();
    validForm();

    var mapCardArray = window.card.generateCardsArray();

    var cardElements = createMapPins(mapCardArray, mapPin, addMapCardElements, mapBlock);

    addMapPinElements(cardElements);
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
