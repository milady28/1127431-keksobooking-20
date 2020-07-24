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
    var cardElements = createMapPins(mapCards, mapPinTemplate, onMapPinClick, addMapPinElement);

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

    //фильтруем
    var mapFiltersForm = document.querySelector('.map__filters');

    var housingType = mapFiltersForm.querySelector('#housing-type');
    var housingPrice = mapFiltersForm.querySelector('#housing-price');
    var housingRooms = mapFiltersForm.querySelector('#housing-rooms');
    var housingGuests = mapFiltersForm.querySelector('#housing-guests');

    var mapFeatureFilterBlock = mapFiltersForm.querySelector('.map__features');
    var features = mapFeatureFilterBlock.querySelectorAll('.map__checkbox');
    var filterWifi = mapFeatureFilterBlock.querySelector('#filter-wifi');

    var cards  = [];

    var offerType = housingType.value;
    var offerPrice = housingPrice.value;
    var offerRooms = housingRooms.value;
    var offerGuests = housingGuests.value;

    var GUESTS_VALUE = {
      '0': 0,
      '1': 1,
      '2': 2
    }

    var ROOMS_VALUE = {
      '1': 1,
      '2': 2,
      '3': 3
    }

    var updateCards = function () {
      var sameTypeCards = cards.
        filter(function(it) {
          return it.offer.type === offerType;
        });

      var samePriceCards = cards.
        filter(function(it) {
          if ((it.offer.price < 10000) && offerPrice === 'low') {
            return it.offer.price;
          } if ((10000 <= it.offer.price < 50000) && offerPrice === 'middle') {
            return it.offer.price;
          } if ((it.offer.price >= 50000) && offerPrice === 'high') {
            return it.offer.price;
          }
        });

      var sameRoomsCards = cards.
        filter(function(it) {
          return it.offer.rooms === ROOMS_VALUE[offerRooms];
        });

      var sameGuestsCards = cards.
        filter(function(it) {
          return it.offer.guests === GUESTS_VALUE[offerGuests];
        });

      // var sameFeaturesCards = cards.
      //   filter(function(it) {
      //     if (it.offer.features.length > 0 && offerFeature.checked) {
      //       if (it.offer.features.includes(offerFeature) != -1) {
      //         console.log(it.offer.features);
      //         return it.offer.features;
      //       }
      //     }
      // });


      var filteredCards = sameTypeCards
        .concat(samePriceCards)
        .concat(sameRoomsCards)
        .concat(sameGuestsCards);
        // .concat(sameFeaturesCards);

      var uniqueCards = filteredCards.filter(function (it, i) {
        return filteredCards.indexOf(it) === i;
      });

      addMapPinElement(uniqueCards);
    };

    housingType.addEventListener('change', function () {
      if (housingType.value === 'any') {
        addMapPinElement(cards);
      } else {
        removeMapPins();
        offerType = housingType.value;
        updateCards();
      }
    });

    housingPrice.addEventListener('change', function () {
      if (housingPrice.value === 'any') {
        addMapPinElement(cards);
      } else {
        removeMapPins();
        offerPrice = housingPrice.value;
        updateCards();
      }
    });

    housingRooms.addEventListener('change', function () {
      if (housingRooms.value === 'any') {
        addMapPinElement(cards);
      } else {
        removeMapPins();
        offerRooms = housingRooms.value;
        updateCards();
      }
    });

    housingGuests.addEventListener('change', function () {
      if (housingGuests.value === 'any') {
        addMapPinElement(cards);
      } else {
        removeMapPins();
        offerGuests = housingGuests.value;
        updateCards();
      }
    });

    // features.forEach(function (feature) {
    //   feature.addEventListener('change', function () {
    //     if (feature.checked) {
    //       var offerFeature = feature.value;
    //       console.log(offerFeature);
    //       updateCards();
    //     } else {
    //       removeMapPins(offerFeature);
    //     }
    //   });
    // });


    var successHandler = function (mapCards) {
      addMapPinElement(mapCards)

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
