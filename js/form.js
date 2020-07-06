'use strict';

(function () {
  var adFormBlock = document.querySelector('.ad-form');
  var allFieldsetAdForm = adFormBlock.querySelectorAll('fieldset');

  var mapFiltersForm = document.querySelector('.map__filters');
  var allFieldsetFiltersForm = mapFiltersForm.querySelectorAll('fieldset');
  var allSelectFiltersForm = mapFiltersForm.querySelectorAll('select');

  var addressInput = adFormBlock.querySelector('#address');

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

  window.activeForm = function () {
    addressInput.value = Math.round(addressInput.offsetTop + (window.const.WIDTH_MAP_PIN / 2)) + ', ' + Math.round(addressInput.offsetLeft + (window.const.HEIGHT_MAP_PIN + window.const.HEIGHT_OFFSET));

    removeDisabledAttribute(allFieldsetAdForm);
    removeDisabledAttribute(allFieldsetFiltersForm);
    removeDisabledAttribute(allSelectFiltersForm);
  };

  window.unactiveForm = function () {
    addressInput.value = Math.round(addressInput.offsetTop + (window.const.WIDTH_MAP_PIN / 2)) + ', ' + Math.round(addressInput.offsetLeft + (window.const.HEIGHT_MAP_PIN / 2));

    addDisabledAttribute(allFieldsetAdForm);
    addDisabledAttribute(allFieldsetFiltersForm);
    addDisabledAttribute(allSelectFiltersForm);
  };

  window.validForm = function () {
    var roomNumberSelect = adFormBlock.querySelector('#room_number');
    var capacitySelect = adFormBlock.querySelector('#capacity');

    roomNumberSelect.addEventListener('change', function () {
      var selectedRooms = roomNumberSelect.value;
      var guestsAvailable = window.const.CHOICES[selectedRooms];

      Array.from(capacitySelect.children).forEach(function (option) {
        option.disabled = !guestsAvailable.includes(option.value);
        option.selected = !option.disabled;
      });
    });

    var offerPrice = adFormBlock.querySelector('#price');
    var housingType = adFormBlock.querySelector('#type');

    housingType.addEventListener('change', function () {
      var type = housingType.value;
      var minPrice = window.const.MIN_PRICE[type];

      offerPrice.setAttribute('min', minPrice);
    });

    var adTimeBlock = adFormBlock.querySelector('.ad-form__element--time');
    var offerTimeIn = adFormBlock.querySelector('#timein');
    var offerTimeOut = adFormBlock.querySelector('#timeout');

    adTimeBlock.addEventListener('change', function (evt) {
      offerTimeIn.value = evt.target.value;
      offerTimeOut.value = evt.target.value;
    });
  };
})();
