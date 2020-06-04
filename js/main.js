'use strict';

var typeArray = ['palace', 'flat', 'house', 'bungalo'];
var timeArray = ['12:00', '13:00', '14:00'];
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (arrayWithElements) {
  var randomIndex = Math.floor(Math.random() * arrayWithElements.length);
  return arrayWithElements[randomIndex];
};

var getArrayWithRandomElements = function (originalArray) {
  var newArray = [];

  for (var i = 0; i <= getRandomInRange(1, originalArray.length); i++) {
    var randomIndex = Math.floor(Math.random() * originalArray.length);
    var randomElement = originalArray[randomIndex];
    newArray.push(randomElement);
    originalArray.splice(randomIndex, 1);
  }

  return newArray;
};

var getOffer = function () {
  var locationX = getRandomInRange(1, 1000);
  var locationY = getRandomInRange(1, 1000);

  var offerMap = {
    author: {
      avatar: 'img/avatars/user0' + getRandomInRange(1, 8)
    },
    offer: {
      title: 'Заголовок предложения',
      address: locationX + ', ' + locationY,
      price: '5000',
      type: getRandomElement(typeArray),
      rooms: getRandomInRange(1, 4),
      guests: getRandomInRange(1, 10),
      checkin: getRandomElement(timeArray),
      checkout: getRandomElement(timeArray),
      features: getArrayWithRandomElements(featuresArray),
      description: 'Описание предложения',
      photos: 'http://o0.github.io/assets/images/tokyo/hotel' + getRandomInRange(1, 3) + '.jpg'
    },
    location: {
      x: getRandomInRange(1, 1000),
      y: getRandomInRange(130, 630)
    }
  };

  return offerMap;
};

console.log(getOffer());

var generateArray = function () {
  var array = [];

  for (var i = 0; i <= 7; i++) {
    array.push(getOffer());
  }

  return array;
};

generateArray();

console.log(generateArray());

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

var mapDomPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
