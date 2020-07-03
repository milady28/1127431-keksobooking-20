'use strict';

(function () {
  var createMapPin = function (pin, template) {
    var mapPinElement = template.cloneNode(true);

    mapPinElement.style.left = pin.location.x + (window.const.WIDTH_MAP_PIN / 2) + 'px';
    mapPinElement.style.top = pin.location.y - (window.const.HEIGHT_OFFSET + window.const.HEIGHT_MAP_PIN) + 'px';
    mapPinElement.querySelector('img').src = pin.author.avatar;
    mapPinElement.querySelector('img').alt = pin.offer.title;

    return mapPinElement;
  },

  var createMapPins = function (array, template) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createMapPin(array[i], template));
    }

    return fragment;
  };

  var generateMapCard = function () {
    var locationX = window.main.getRandomInRange(0, window.const.WIDTH_MAP);
    var locationY = window.main.getRandomInRange(130, 630);

    var mapCard = {
      author: {
        avatar: 'img/avatars/user0' + window.main.getRandomInRange(1, 8) + '.png'
      },
      offer: {
        title: 'Заголовок предложения',
        address: locationX + ', ' + locationY,
        price: '5000',
        type: window.main.getRandomElement(window.const.TYPE_ARRAY),
        rooms: window.main.getRandomInRange(1, 4),
        guests: window.main.getRandomInRange(1, 10),
        checkin: window.main.getRandomElement(window.const.TIME_ARRAY),
        checkout: window.main.getRandomElement(window.const.TIME_ARRAY),
        features: window.main.getArrayWithRandomElements(window.const.FEATURES_ARRAY),
        description: 'Описание предложения',
        photos: 'http://o0.github.io/assets/images/tokyo/hotel' + window.main.getRandomInRange(1, 3) + '.jpg'
      },
      location: {
        x: locationX,
        y: locationY
      }
    };

    return mapCard;
  };

  var generateCardsArray = function () {
    var cardsArray = [];

    for (var i = 0; i <= 7; i++) {
      cardsArray.push(generateMapCard());
    }

    return cardsArray;
  };

  var addMapPinElements = function (array) {
    var mapPinsBlock = mapBlock.querySelector('.map__pins');

    mapPinsBlock.appendChild(createMapPins(array, mapPin));
  };

  var getTypeValue = function (type) {
    switch (type) {
      case 'palace':
        type = 'Дворец';
        break;
      case 'flat':
        type = 'Квартира';
        break;
      case 'house':
        type = 'Дом';
        break;
      case 'bungalo':
        type = 'Бунгало';
        break;
    }

    return type;
  };

  var deleteChildElements = function (block) {
    while (block.firstChild) {
      block.removeChild(block.firstChild);
    }
  };

  var getOfferFeatures = function (array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      var newFeature = document.createElement('li');
      newFeature.className = 'popup__feature';
      var classFeatureElement = 'popup__feature--' + array[i];
      newFeature.classList.add(classFeatureElement);
      fragment.appendChild(newFeature);
    }

    return fragment;
  };

  var createMapCard = function (card, template) {
    var mapCardElement = template.cloneNode(true);

    mapCardElement.querySelector('.popup__title').textContent = card.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    mapCardElement.querySelector('.popup__type').textContent = getTypeValue(card.offer.type);
    mapCardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ' , выезд до ' + card.offer.checkout;
    mapCardElement.querySelector('.popup__description').textContent = card.offer.description;
    mapCardElement.querySelector('.popup__photos > img').src = card.offer.photos;
    mapCardElement.querySelector('.popup__avatar').src = card.author.avatar;

    var featuresBlock = mapCardElement.querySelector('.popup__features');
    deleteChildElements(featuresBlock);

    var fragmentOfferFeatures = getOfferFeatures(card.offer.features);
    featuresBlock.appendChild(fragmentOfferFeatures);

    return mapCardElement;
  };

  var addMapCardElements = function (element) {
    var mapBlock = document.querySelector('.map');

    var offerCard = document.querySelector('#card')
      .content
      .querySelector('.map__card');

    var mapFiltersContainer = document.querySelector('.map__filters-container');

    mapBlock.insertBefore(createMapCard(element, offerCard), mapFiltersContainer);
  };

  window.pin = {
    createMapPin,
    createMapPins,
    generateCardsArray,
    addMapPinElements,
    addMapCardElements
  }
})();
