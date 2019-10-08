'use strict';

(function () {
  var getEnterKeycode = function () {
    return 13;
  };

  var getEscKeycode = function () {
    return 27;
  };

  var getFragment = function () {
    return document.createDocumentFragment();
  };

  window.util = {
    getFragment: getFragment,
    getEnterKeyCode: getEnterKeycode,
    getEscKeyCode: getEscKeycode
  };
})();
