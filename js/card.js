'use strict';

(function () {
  var generateMapCard = function () {
    var WIDTH_MAP = window.const.WIDTH_MAP;

    var locationX = window.getRandomInRange(0, WIDTH_MAP);
    var locationY = window.getRandomInRange(130, 630);

    var mapCard = {
      author: {
        avatar: 'img/avatars/user0' + window.getRandomInRange(1, 8) + '.png'
      },
      offer: {
        title: 'Заголовок предложения',
        address: locationX + ', ' + locationY,
        price: '5000',
        type: window.getRandomElement(window.const.TYPE_ARRAY),
        rooms: window.getRandomInRange(1, 4),
        guests: window.getRandomInRange(1, 10),
        checkin: window.getRandomElement(window.const.TIME_ARRAY),
        checkout: window.getRandomElement(window.const.TIME_ARRAY),
        features: window.getArrayWithRandomElements(window.const.FEATURES_ARRAY),
        description: 'Описание предложения',
        photos: 'http://o0.github.io/assets/images/tokyo/hotel' + window.getRandomInRange(1, 3) + '.jpg'
      },
      location: {
        x: locationX,
        y: locationY
      }
    };

    return mapCard;
  };

  var generateCardsArray = function () {
    var array = [];

    for (var i = 0; i <= 7; i++) {
      array.push(generateMapCard());
    }

    return array;
  };

  window.cardsArray = generateCardsArray();

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

  window.addMapCardElements = function (element) {
    var mapBlock = document.querySelector('.map');

    var offerCard = document.querySelector('#card')
        .content
        .querySelector('.map__card');

    var mapFiltersContainer = document.querySelector('.map__filters-container');

    mapBlock.insertBefore(createMapCard(element, offerCard), mapFiltersContainer);
  };
})();
