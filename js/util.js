'use strict';

(function () {
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

  window.util = {
    addDisabledAttribute: addDisabledAttribute,
    removeDisabledAttribute: removeDisabledAttribute
  };
})();
