'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';
  var DATA_URL = 'https://javascript.pages.academy/keksobooking/data';

  var StatusCode = {
    OK: 200
  };

  var TIMEOUT_IN_MS = 10000;

  var loadFunction = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  var uploadFunction = function (data, onSuccess, onError, deactiveMap) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        deactiveMap();
      } else {
        onError(xhr.response);
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.load = {
    loadFunction: loadFunction,
    uploadFunction: uploadFunction
  };
})();
