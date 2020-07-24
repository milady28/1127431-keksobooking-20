'use strict';

(function () {
  var offerPrice = {
    middle: [10000, 50000],
    low: 10000,
    high: 50000
  };

  var addDisabledAttribute = window.util.addDisabledAttribute;
  var removeDisabledAttribute = window.util.removeDisabledAttribute;

  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFeaturesFilter = mapFiltersForm.querySelectorAll('.map__features');
  var mapFilters = mapFiltersForm.querySelectorAll('.map__filter');

  var housingType = mapFiltersForm.querySelector('#housing-type');
  var housingPrice = mapFiltersForm.querySelector('#housing-price');
  var housingRooms = mapFiltersForm.querySelector('#housing-rooms');
  var housingGuests = mapFiltersForm.querySelector('#housing-guests');

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
    resetFiltersForm: resetFiltersForm
    // getFilteredMapPins: getFilteredMapPins
  };
})();
