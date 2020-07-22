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

  var mainBlock = document.querySelector('main');

  var adFormBlock = document.querySelector('.ad-form');
  var allFieldsetAdForm = adFormBlock.querySelectorAll('fieldset');
  var resetButton = adFormBlock.querySelector('.ad-form__reset');

  var roomNumberSelect = adFormBlock.querySelector('#room_number');
  var capacitySelect = adFormBlock.querySelector('#capacity');

  var offerPrice = adFormBlock.querySelector('#price');
  var housingType = adFormBlock.querySelector('#type');

  var adTimeBlock = adFormBlock.querySelector('.ad-form__element--time');
  var offerTimeIn = adFormBlock.querySelector('#timein');
  var offerTimeOut = adFormBlock.querySelector('#timeout');

  var mapFiltersForm = document.querySelector('.map__filters');
  var allFieldsetFiltersForm = mapFiltersForm.querySelectorAll('fieldset');
  var allSelectFiltersForm = mapFiltersForm.querySelectorAll('select');

  var addressInput = adFormBlock.querySelector('#address');

  var successWindowTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

  var errorWindowTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

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

  var activeForm = function () {
    adFormBlock.classList.remove('ad-form--disabled');

    removeDisabledAttribute(allFieldsetAdForm);
    removeDisabledAttribute(allFieldsetFiltersForm);
    removeDisabledAttribute(allSelectFiltersForm);

    resetButton.addEventListener('click', function (evt) {
      evt.preventDefault();

      adFormBlock.reset();
    });

    adFormBlock.addEventListener('submit', submitHandler);
  };

  var unactiveForm = function (mainPin) {
    adFormBlock.classList.add('ad-form--disabled');

    mainPin.style.left = START_COORDS.x + 'px';
    mainPin.style.top = START_COORDS.y + 'px';

    addressInput.value = Math.floor(START_COORDS.x) + ', ' + Math.floor(START_COORDS.y);

    addDisabledAttribute(allFieldsetAdForm);
    addDisabledAttribute(allFieldsetFiltersForm);
    addDisabledAttribute(allSelectFiltersForm);
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

    housingType.addEventListener('change', function () {
      var type = housingType.value;
      var minPrice = MIN_PRICE[type];

      offerPrice.setAttribute('min', minPrice);
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
