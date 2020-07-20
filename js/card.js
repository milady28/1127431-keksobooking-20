'use strict';

(function () {
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
    mapCardElement.querySelector('.popup__avatar').src = card.author.avatar;

    var photosArray = card.offer.photos;
    var photo = mapCardElement.querySelector('.popup__photos > img');

    if (photosArray.length > 0) {
      for (var i = 1; i <= card.offer.photos.length - 1; i++) {
        photo.src = card.offer.photos[0];

        var cloneNode = photo.cloneNode();
        cloneNode.src = card.offer.photos[i];
        mapCardElement.querySelector('.popup__photos').appendChild(cloneNode);
      }
    } else {
      mapCardElement.querySelector('.popup__photos').removeChild(photo);
    }

    var featuresBlock = mapCardElement.querySelector('.popup__features');
    deleteChildElements(featuresBlock);

    var fragmentOfferFeatures = getOfferFeatures(card.offer.features);
    featuresBlock.appendChild(fragmentOfferFeatures);

    return mapCardElement;
  };

  window.card = {
    createMapCard: createMapCard
  };
})();
