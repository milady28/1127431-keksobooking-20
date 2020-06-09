'use strict';

var TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalo'];
var TIME_ARRAY = ['12:00', '13:00', '14:00'];
var FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var WIDTH_MAP = 947.5;
var OFFSET_BY_X = 32.5;
var OFFSET_BY_Y = 65;

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (arrayWithElements) {
  var randomIndex = getRandomInRange(0, arrayWithElements.length - 1);
  return arrayWithElements[randomIndex];
};

var getArrayWithRandomElements = function (originalArray) {
  var newArray = [];
  var arrayCopy = originalArray.slice();

  for (var i = 0; i <= getRandomInRange(0, originalArray.length - 1); i++) {
    var randomElement = getRandomElement(arrayCopy);
    newArray.push(randomElement);
    arrayCopy.splice(arrayCopy.indexOf(randomElement), 1);
  }

  return newArray;
};

var getOffer = function () {
  var locationX = getRandomInRange(0, WIDTH_MAP);
  var locationY = getRandomInRange(130, 630);

  var offerMap = {
    author: {
      avatar: 'img/avatars/user0' + getRandomInRange(1, 8) + '.png'
    },
    offer: {
      title: 'Заголовок предложения',
      address: locationX + ', ' + locationY,
      price: '5000',
      type: getRandomElement(TYPE_ARRAY),
      rooms: getRandomInRange(1, 4),
      guests: getRandomInRange(1, 10),
      checkin: getRandomElement(TIME_ARRAY),
      checkout: getRandomElement(TIME_ARRAY),
      features: getArrayWithRandomElements(FEATURES_ARRAY),
      description: 'Описание предложения',
      photos: 'http://o0.github.io/assets/images/tokyo/hotel' + getRandomInRange(1, 3) + '.jpg'
    },
    location: {
      x: locationX,
      y: locationY
    }
  };

  return offerMap;
};

var generateArray = function () {
  var array = [];

  for (var i = 0; i <= 7; i++) {
    array.push(getOffer());
  }

  return array;
};

var renderMapPin = function (pin, template) {
  var mapPinElement = template.cloneNode(true);

  mapPinElement.style.left = pin.location.x + OFFSET_BY_X + 'px';
  mapPinElement.style.top = pin.location.y - OFFSET_BY_Y + 'px';
  mapPinElement.querySelector('img').src = pin.author.avatar;
  mapPinElement.querySelector('img').alt = pin.offer.title;

  return mapPinElement;
};

var renderMapCard = function (card, template) {
  var mapCardElement = template.cloneNode(true);

  mapCardElement.querySelector('.popup__title').textContent = card.offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  mapCardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  mapCardElement.querySelector('.popup__type').textContent = card.offer.type;
  mapCardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ' , выезд до ' + card.offer.checkout;
  // mapCardElement.querySelector('.popup__feature').textContent = card.offer.type;
  mapCardElement.querySelector('.popup__description').textContent = card.offer.description;
  mapCardElement.querySelector('.popup__photos > img').src = card.offer.photos;
  mapCardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return mapCardElement;
};

var createMapPins = function (array, template) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderMapPin(array[i], template));
  }

  return fragment;
};

var createMapCards = function (array, template) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderMapCard(array[i], template));
  }

  return fragment;
};

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

var mapPinsBlock = mapBlock.querySelector('.map__pins');

var mapPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var offerCard = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var mapFiltersContainer = document.querySelector('.map__filters-container');

mapPinsBlock.appendChild(createMapPins(generateArray(), mapPin));

mapBlock.insertBefore(createMapCards(generateArray(), offerCard), mapFiltersContainer);
