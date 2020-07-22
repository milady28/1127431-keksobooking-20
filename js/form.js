'use strict';

(function () {
  var CHOICE = {
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

  var START_COORDS = {
    x: 571,
    y: 375
  };

  var uploadFunction = window.load.uploadFunction;

  var addDisabledAttribute = window.util.addDisabledAttribute;
  var removeDisabledAttribute = window.util.removeDisabledAttribute;

  var blockFieldsFilters = window.filter.blockFieldsFilters;
  var unlockFieldsFilters = window.filter.unlockFieldsFilters;
  var resetFiltersForm = window.filter.resetFiltersForm;

  var mainBlock = document.querySelector('main');

  var adFormBlock = document.querySelector('.ad-form');
  var fieldsetsAdForm = adFormBlock.querySelectorAll('fieldset');
  var resetButton = adFormBlock.querySelector('.ad-form__reset');

  var roomNumberSelect = adFormBlock.querySelector('#room_number');
  var capacitySelect = adFormBlock.querySelector('#capacity');

  var offerPrice = adFormBlock.querySelector('#price');
  var housingType = adFormBlock.querySelector('#type');

  var adTimeBlock = adFormBlock.querySelector('.ad-form__element--time');
  var offerTimeIn = adFormBlock.querySelector('#timein');
  var offerTimeOut = adFormBlock.querySelector('#timeout');

  var addressInput = adFormBlock.querySelector('#address');

  var successWindowTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

  var errorWindowTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  var submitHandler = function (evt) {
    var deactiveMap = window.map.deactiveMap;

    uploadFunction(new FormData(adFormBlock), function () {
      successMessage();
      deactiveMap();
    }, function () {
      errorMessage();
    });
    evt.preventDefault();
  };

  var onResetButtonClick = function (evt) {
    evt.preventDefault();

    adFormBlock.reset();
    resetFiltersForm();
  };

  var activeForm = function () {
    adFormBlock.classList.remove('ad-form--disabled');

    removeDisabledAttribute(fieldsetsAdForm);
    unlockFieldsFilters();

    resetButton.addEventListener('click', onResetButtonClick);

    adFormBlock.addEventListener('submit', submitHandler);
  };

  var unactiveForm = function (mainMapPin) {
    adFormBlock.classList.add('ad-form--disabled');

    mainMapPin.style.left = START_COORDS.x + 'px';
    mainMapPin.style.top = START_COORDS.y + 'px';

    addressInput.value = Math.floor(START_COORDS.x) + ', ' + Math.floor(START_COORDS.y);

    addDisabledAttribute(fieldsetsAdForm);
    blockFieldsFilters();

    resetButton.removeEventListener('click', onResetButtonClick);
  };

  var validForm = function () {
    adFormBlock.addEventListener('change', function () {
      var selectedRoom = roomNumberSelect.options[roomNumberSelect.selectedIndex];
      var selectedCapacity = capacitySelect.options[capacitySelect.selectedIndex];

      var availableValue = CHOICE[selectedRoom.value];

      if (!availableValue.includes(selectedCapacity.value)) {
        roomNumberSelect.setCustomValidity('Неверное количество комнат!');
      } else {
        roomNumberSelect.setCustomValidity('');
      }
    });

    offerPrice.addEventListener('change', function () {
      var type = housingType.value;
      var minPrice = MIN_PRICE[type];

      offerPrice.setAttribute('min', minPrice);

      if (minPrice < offerPrice.value) {
        offerPrice.setCustomValidity('');
      }
    });

    adTimeBlock.addEventListener('change', function (evt) {
      offerTimeIn.value = evt.target.value;
      offerTimeOut.value = evt.target.value;
    });
  };

  var onMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();

      closeMessage();
    }
  };

  var closeMessage = function () {
    var messageSuccess = document.querySelector('.success');
    var messageError = document.querySelector('.error');

    if (messageSuccess) {
      messageSuccess.remove();
    } else if (messageError) {
      messageError.remove();
    }

    document.removeEventListener('keydown', onMessageEscPress);
  };

  var successMessage = function () {
    var successWindow = successWindowTemplate.cloneNode(true);

    mainBlock.appendChild(successWindow);

    var onEscClick = function (evt) {
      evt.preventDefault();

      closeMessage();

      document.removeEventListener('click', onEscClick);
    };

    document.addEventListener('click', onEscClick);
    document.addEventListener('keydown', onMessageEscPress);

    adFormBlock.reset();
  };

  var errorMessage = function () {
    var errorWindow = errorWindowTemplate.cloneNode(true);

    mainBlock.appendChild(errorWindow);

    var onEscClick = function (evt) {
      evt.preventDefault();

      closeMessage();

      closeButton.removeEventListener('click', onEscClick);
      document.removeEventListener('click', onEscClick);
    };

    var closeButton = errorWindow.querySelector('.error__button');

    closeButton.addEventListener('click', onEscClick);

    document.addEventListener('click', onEscClick);
    document.addEventListener('keydown', onMessageEscPress);
  };

  window.form = {
    activeForm: activeForm,
    unactiveForm: unactiveForm,
    validForm: validForm
  };
})();
