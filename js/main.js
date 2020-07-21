'use strict';

(function () {
  var deactiveMap = window.map.deactiveMap;
  var activeMap = window.map.activeMap;

  var uploadFunction = window.load.uploadFunction;

  var successMessage = window.form.successMessage;
  var errorMessage = window.form.errorMessage;

  var mainMapPin = document.querySelector('.map__pin--main');

  var adFormBlock = document.querySelector('.ad-form');

  deactiveMap();

  mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activeMap();
    }
  });

  var submitHandler = function (evt) {
    uploadFunction(new FormData(adFormBlock), function () {
      successMessage();
    }, function () {
      errorMessage();
    }, deactiveMap);
    evt.preventDefault();
  };

  adFormBlock.addEventListener('submit', submitHandler);
})();


