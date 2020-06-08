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

var renderMapPin = function (pin) {
  var mapPinElement = mapPin.cloneNode(true);

  mapPinElement.style.left = pin.location.x + OFFSET_BY_X + 'px';
  mapPinElement.style.top = pin.location.y - OFFSET_BY_Y + 'px';
  mapPinElement.querySelector('img').src = pin.author.avatar;
  mapPinElement.querySelector('img').alt = pin.offer.title;

  return mapPinElement;
};

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

var mapPinsBlock = mapBlock.querySelector('.map__pins');

var mapPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var createElements = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < generateArray().length; i++) {
    fragment.appendChild(renderMapPin(generateArray()[i]));
  }

  return fragment;
};

mapPinsBlock.appendChild(createElements());

