'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var getEnterKeycode = function () {
    return 13;
  };

  var getEscKeycode = function () {
    return 27;
  };

  var getFragment = function () {
    return document.createDocumentFragment();
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    getFragment: getFragment,
    getEnterKeyCode: getEnterKeycode,
    getEscKeyCode: getEscKeycode,
    debounce: debounce
  };
})();
