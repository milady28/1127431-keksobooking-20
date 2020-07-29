'use strict';

(function () {
  var addDisabledAttribute = window.util.addDisabledAttribute;
  var removeDisabledAttribute = window.util.removeDisabledAttribute;

  var GUESTS_VALUE = {
    '0': 0,
    '1': 1,
    '2': 2
  };

  var ROOMS_VALUE = {
    '1': 1,
    '2': 2,
    '3': 3
  };

  var PRICE_LIMIT = {
    low: 10000,
    high: 50000
  };

  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFeaturesFilter = mapFiltersForm.querySelectorAll('.map__features');
  var mapFilters = mapFiltersForm.querySelectorAll('.map__filter');
  var inputFilters = mapFiltersForm.querySelectorAll('.map__checkbox');

  var housingType = mapFiltersForm.querySelector('#housing-type');
  var housingPrice = mapFiltersForm.querySelector('#housing-price');
  var housingRooms = mapFiltersForm.querySelector('#housing-rooms');
  var housingGuests = mapFiltersForm.querySelector('#housing-guests');

  var offerFilter = function (card) {
    var offerFeatures = card.offer.features;

    if (housingType.value !== 'any' && card.offer.type !== housingType.value) {
      return false;
    }

    if (housingPrice.value !== 'any' &&
      (housingPrice.value === 'low' && card.offer.price >= PRICE_LIMIT.low
      || housingPrice.value === 'middle' && (card.offer.price < PRICE_LIMIT.low || card.offer.price > PRICE_LIMIT.high)
      || housingPrice.value === 'high' && card.offer.price <= PRICE_LIMIT.high)
    ) {
      return false;
    }

    if (housingRooms.value !== 'any' && card.offer.rooms !== ROOMS_VALUE[housingRooms.value]) {
      return false;
    }

    if (housingGuests.value !== 'any' && card.offer.guests !== GUESTS_VALUE[housingGuests.value]) {
      return false;
    }

    for (var i = 0; i < inputFilters.length; i++) {
      if (inputFilters[i].checked === true && offerFeatures.indexOf(inputFilters[i].value) === -1) {
        return false;
      }
    }

    return true;
  };

  var resetFiltersForm = function () {
    mapFiltersForm.reset();
  };

  var blockFieldsFilters = function () {
    addDisabledAttribute(mapFeaturesFilter);
    addDisabledAttribute(mapFilters);
  };

  var unlockFieldsFilters = function () {
    removeDisabledAttribute(mapFeaturesFilter);
    removeDisabledAttribute(mapFilters);
  };

  window.filter = {
    blockFieldsFilters: blockFieldsFilters,
    unlockFieldsFilters: unlockFieldsFilters,
    resetFiltersForm: resetFiltersForm,
    offerFilter: offerFilter
  };
})();
