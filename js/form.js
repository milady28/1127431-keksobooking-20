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
    adFormBlock.classList.remove('ad-form--disabled');

    removeDisabledAttribute(allFieldsetAdForm);
    removeDisabledAttribute(allFieldsetFiltersForm);
    removeDisabledAttribute(allSelectFiltersForm);

    var resetButton = adFormBlock.querySelector('.ad-form__reset');

    resetButton.addEventListener('click', function (evt) {
      evt.preventDefault();

      adFormBlock.reset();
    });
  };

  var unactiveForm = function () {
    adFormBlock.classList.add('ad-form--disabled');

    var mapPin = document.querySelector('.map__pin--main');

    addressInput.value = Math.floor(mapPin.offsetLeft) + ', ' + Math.floor(mapPin.offsetTop);

    addDisabledAttribute(allFieldsetAdForm);
    addDisabledAttribute(allFieldsetFiltersForm);
    addDisabledAttribute(allSelectFiltersForm);
  };

  var validForm = function () {
    var roomNumberSelect = adFormBlock.querySelector('#room_number');
    var capacitySelect = adFormBlock.querySelector('#capacity');

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

  var successMessage = function () {
    var successWindowTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

    var successWindow = successWindowTemplate.cloneNode(true);

    document.querySelector('main').appendChild(successWindow);

    var onMessageEscPress = function (evt1) {
      if (evt1.key === 'Escape') {
        evt1.preventDefault();

        closeMessage();
      }
    };

    var closeMessage = function () {
      var message = document.querySelector('.success');
      if (message) {
        message.remove();
      }

      document.removeEventListener('keydown', onMessageEscPress);
    };

    var onEscClickListener = function (evt2) {
      evt2.preventDefault();

      closeMessage();
    };

    document.addEventListener('click', onEscClickListener);
    document.addEventListener('keydown', onMessageEscPress);

    adFormBlock.reset();
  };

  var errorMessage = function () {
    var errorWindowTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

    var errorWindow = errorWindowTemplate.cloneNode(true);

    document.querySelector('main').appendChild(errorWindow);

    var onMessageEscPress = function (evt1) {
      if (evt1.key === 'Escape') {
        evt1.preventDefault();

        closeMessage();
      }
    };

    var closeMessage = function () {
      var message = document.querySelector('.error');
      if (message) {
        message.remove();
      }

      document.removeEventListener('keydown', onMessageEscPress);
    };

    var onEscClickListener = function (evt2) {
      evt2.preventDefault();

      closeMessage();
    };

    var closeButton = errorWindow.querySelector('.error__button');

    closeButton.addEventListener('click', onEscClickListener);

    document.addEventListener('click', onEscClickListener);
    document.addEventListener('keydown', onMessageEscPress);
  };

  // var submitHandler = function (evt) {
  //   window.load.uploadFunction(new FormData(adFormBlock), successMessage, errorMessage);
  //   evt.preventDefault();
  // };

  // adFormBlock.addEventListener('submit', submitHandler);

  window.form = {
    activeForm: activeForm,
    unactiveForm: unactiveForm,
    validForm: validForm,
    successMessage: successMessage,
    errorMessage: errorMessage
  };
})();
