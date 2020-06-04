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

var createAuthor = function () {
  var author = {
    avatar: 'img/avatars/user0' + getRandomInRange(1, 8)
  };

  return author;
};

var createOffer = function () {
  var locationX = getRandomInRange(1, 1000);
  var locationY = getRandomInRange(1, 1000);

  var offer = {
    title: 'Заголовок предложения',
    address: locationX + ', ' + locationY,
    price: '5000',
    type: getRandomElement(typeArray),
    rooms: getRandomInRange(1, 4),
    guests: getRandomInRange(1, 10),
    checkin: getRandomElement(timeArray),
    checkout: getRandomElement(timeArray),
    features: getRandomElement(featuresArray),
    description: 'Описание предложения',
    photos: 'http://o0.github.io/assets/images/tokyo/hotel' + getRandomInRange(1, 3) + '.jpg'
  };

  return offer;
};

var createLocation = function () {
  var location = {
    x: getRandomInRange(1, 100),
    y: getRandomInRange(1, 100)
  };

  return location;
};

// console.log(createAuthor());
// console.log(createOffer());
// console.log(createLocation());

var generateArray = function () {
  var array = [];

  for (var i = 0; i <= 8; i++) {
    array.push(createAuthor());
    array.push(createOffer());
    array.push(createLocation());
  }

  return array;
};

generateArray();

// console.log(generateArray());

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');
