'use strict';

(function () {
  var WIDTH_MAP_PIN = 62;
  var HEIGHT_OFFSET = 22;
  var HEIGHT_MAP_PIN = 62;

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
    'palace': '10000'
  };

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

  var activeForm = function () {
    addressInput.value = Math.round(addressInput.offsetTop + (WIDTH_MAP_PIN / 2)) + ', ' + Math.round(addressInput.offsetLeft + (HEIGHT_MAP_PIN + HEIGHT_OFFSET));

    removeDisabledAttribute(allFieldsetAdForm);
    removeDisabledAttribute(allFieldsetFiltersForm);
    removeDisabledAttribute(allSelectFiltersForm);
  };

  var unactiveForm = function () {
    addressInput.value = Math.round(addressInput.offsetTop + (WIDTH_MAP_PIN / 2)) + ', ' + Math.round(addressInput.offsetLeft + (HEIGHT_MAP_PIN / 2));

    addDisabledAttribute(allFieldsetAdForm);
    addDisabledAttribute(allFieldsetFiltersForm);
    addDisabledAttribute(allSelectFiltersForm);
  };

  var validForm = function () {
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
  };

  window.form = {
    activeForm: activeForm,
    unactiveForm: unactiveForm,
    validForm: validForm
  };
})();
