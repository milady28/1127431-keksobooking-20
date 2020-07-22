'use strict';

(function () {
  var addDisabledAttribute = window.util.addDisabledAttribute;
  var removeDisabledAttribute = window.util.removeDisabledAttribute;

  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFeaturesFilter = mapFiltersForm.querySelectorAll('.map__features');
  var mapFilters = mapFiltersForm.querySelectorAll('.map__filter');

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
  };
})();
