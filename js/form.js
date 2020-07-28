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

  var PIN_OFFSET = {
    offsetY: 54
  };

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadFunction = window.load.uploadFunction;

  var addDisabledAttribute = window.util.addDisabledAttribute;
  var removeDisabledAttribute = window.util.removeDisabledAttribute;

  var blockFieldsFilters = window.filter.blockFieldsFilters;
  var unlockFieldsFilters = window.filter.unlockFieldsFilters;

  var mainBlock = document.querySelector('main');

  var adFormBlock = document.querySelector('.ad-form');
  var fieldsetsAdForm = adFormBlock.querySelectorAll('fieldset');

  var roomNumberSelect = adFormBlock.querySelector('#room_number');
  var capacitySelect = adFormBlock.querySelector('#capacity');

  var offerPrice = adFormBlock.querySelector('#price');
  var housingType = adFormBlock.querySelector('#type');

  var adTimeBlock = adFormBlock.querySelector('.ad-form__element--time');
  var offerTimeIn = adFormBlock.querySelector('#timein');
  var offerTimeOut = adFormBlock.querySelector('#timeout');

  var addressInput = adFormBlock.querySelector('#address');

  var previewChooser = adFormBlock.querySelector('.ad-form-header input[type=file]');
  var preview = adFormBlock.querySelector('.ad-form-header__preview img');

  var photoChooser = adFormBlock.querySelector('.ad-form__upload input[type=file]');
  var housingPhotoBlock = adFormBlock.querySelector('.ad-form__photo');

  var successWindowTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

  var errorWindowTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  var onUserPreviewChange = function () {
    previewChooser.addEventListener('change', function () {
      var file = previewChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  var onHousingPhotoChange = function () {
    photoChooser.addEventListener('change', function () {
      var img = document.createElement('img');
      var widthPhoto = housingPhotoBlock.offsetWidth;
      var heightPhoto = housingPhotoBlock.offsetHeight;

      var file = photoChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          img.src = reader.result;
          img.setAttribute('width', widthPhoto);
          img.setAttribute('height', heightPhoto);
          housingPhotoBlock.appendChild(img);
        });

        reader.readAsDataURL(file);
      }
    });
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

    onUserPreviewChange();
    onHousingPhotoChange();

    addressInput.value = Math.floor(START_COORDS.x) + ', ' + Math.floor(START_COORDS.y + PIN_OFFSET.offsetY);

    removeDisabledAttribute(fieldsetsAdForm);
    unlockFieldsFilters();

    adFormBlock.addEventListener('submit', submitHandler);
  };

  var unactiveForm = function (mainMapPin) {
    adFormBlock.classList.add('ad-form--disabled');

    mainMapPin.style.left = START_COORDS.x + 'px';
    mainMapPin.style.top = START_COORDS.y + 'px';

    adFormBlock.reset();

    addressInput.value = Math.floor(START_COORDS.x) + ', ' + Math.floor(START_COORDS.y);

    addDisabledAttribute(fieldsetsAdForm);
    blockFieldsFilters();
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
