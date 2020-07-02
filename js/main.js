'use strict';

var TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalo'];
var TIME_ARRAY = ['12:00', '13:00', '14:00'];
var FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var WIDTH_MAP = 947.5;
var WIDTH_MAP_PIN = 62;
var HEIGHT_MAP_PIN = 62;
var HEIGHT_OFFSET = 22;

var CHOICES = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

var MIN_PRICE = {
  'bungalo': '0',
  'flat': '1000',
  'house': '5000',
  'palace': '10000',
};

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

var renderMapPin = function (pin, template) {
  var mapPinElement = template.cloneNode(true);

  mapPinElement.style.left = pin.location.x + (WIDTH_MAP_PIN / 2) + 'px';
  mapPinElement.style.top = pin.location.y - (HEIGHT_OFFSET + HEIGHT_MAP_PIN) + 'px';
  mapPinElement.querySelector('img').src = pin.author.avatar;
  mapPinElement.querySelector('img').alt = pin.offer.title;

  return mapPinElement;
};

var renderMapCard = function (card, template) {
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

var createMapPins = function (array, template) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderMapPin(array[i], template));
  }

  return fragment;
};

var handleEventClickOnMapPin = function (array, element) {
  array.addEventListener('click', function (evt) {
    evt.preventDefault();
    var mapCard = mapBlock.querySelector('.map__card');

    if (mapCard) {
      mapBlock.removeChild(mapCard);
    }

    mapBlock.insertBefore(renderMapCard(element, offerCard), mapFiltersContainer);

    var popupBtnClose = mapBlock.querySelector('.popup__close');

    popupBtnClose.addEventListener('click', function (evt1) {
      evt1.preventDefault();
      mapBlock.removeChild(mapBlock.querySelector('.map__card'));
    });
  });
};

var onActiveMode = function () {
  mapBlock.classList.remove('map--faded');
  adFormBlock.classList.remove('ad-form--disabled');

  mapPinsBlock.appendChild(createMapPins(offersArray, mapPin));

  removeDisabledAttribute(allFieldsetAdForm);
  removeDisabledAttribute(allFieldsetFiltersForm);
  removeDisabledAttribute(allSelectFiltersForm);

  addressInput.value = Math.round(addressInput.offsetTop + (WIDTH_MAP_PIN / 2)) + ', ' + Math.round(addressInput.offsetLeft + (HEIGHT_MAP_PIN + HEIGHT_OFFSET));

  var roomNumberSelect = adFormBlock.querySelector('#room_number');
  var capacitySelect = adFormBlock.querySelector('#capacity');

  roomNumberSelect.addEventListener('change', function () {
    var selectedRooms = roomNumberSelect.value;
    var guestsAvailable = CHOICES[selectedRooms];

    Array.from(capacitySelect.children).forEach(function (option) {
      option.disabled = !guestsAvailable.includes(option.value);
      option.selected = !option.disabled;
    });
  });

  var offerPrice = adFormBlock.querySelector('#price');
  var housingType = adFormBlock.querySelector('#type');

  housingType.addEventListener('change', function () {
    var type = housingType.value;
    var minPrice = MIN_PRICE[type];

    offerPrice.setAttribute('min', minPrice);
  });

  var adTimeBlock = adFormBlock.querySelector('.ad-form__element--time');
  var offerTimeIn = adFormBlock.querySelector('#timein');
  var offerTimeOut = adFormBlock.querySelector('#timeout');

  adTimeBlock.addEventListener('change', function (evt) {
    offerTimeIn.value = evt.target.value;
    offerTimeOut.value = evt.target.value;
  });

  var mapPins = mapBlock.querySelectorAll('.map__pin');

  for (var i = 1; i < mapPins.length; i++) {
    handleEventClickOnMapPin(mapPins[i], offersArray[i - 1]);
  }

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      mapBlock.removeChild(mapBlock.querySelector('.map__card'));
    }
  });
};

var addDisabledAttribute = function (collect) {
  for (var i = 0; i < collect.length; i++) {
    collect[i].disabled = true;
  }
};

var removeDisabledAttribute = function (collect) {
  for (var i = 0; i < collect.length; i++) {
    collect[i].disabled = false;
  }
};

var mapBlock = document.querySelector('.map');

var mapPinsBlock = mapBlock.querySelector('.map__pins');

var mapPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var offerCard = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var mapFiltersContainer = document.querySelector('.map__filters-container');

var offersArray = generateArray();

var adFormBlock = document.querySelector('.ad-form');
var allFieldsetAdForm = adFormBlock.querySelectorAll('fieldset');

var mapFiltersForm = document.querySelector('.map__filters');
var allFieldsetFiltersForm = mapFiltersForm.querySelectorAll('fieldset');
var allSelectFiltersForm = mapFiltersForm.querySelectorAll('select');

addDisabledAttribute(allFieldsetAdForm);
addDisabledAttribute(allFieldsetFiltersForm);
addDisabledAttribute(allSelectFiltersForm);

var mainMapPin = document.querySelector('.map__pin--main');

mainMapPin.addEventListener('mousedown', function (evt) {
  var buttonPressed = evt.button;
  if (buttonPressed === 0) {
    onActiveMode();
  }
});

mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    onActiveMode();
  }
});

var addressInput = adFormBlock.querySelector('#address');

addressInput.value = Math.round(addressInput.offsetTop + (WIDTH_MAP_PIN / 2)) + ', ' + Math.round(addressInput.offsetLeft + (HEIGHT_MAP_PIN / 2));
