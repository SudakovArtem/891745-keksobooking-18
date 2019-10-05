'use strict';

(function () {
  var TIMEOUT_VALUE = 10000;
  var OK_STATUS = 200;
  var GET_URL = 'https://js.dump.academy/keksobooking/data';

  var getTypes = function () {
    return [
      {
        'type': 'palace',
        'textContent': 'Дворец',
        'minCost': 10000,

      },
      {
        'type': 'flat',
        'textContent': 'Квартира',
        'minCost': 1000,

      },
      {
        'type': 'house',
        'textContent': 'Дом',
        'minCost': 5000,

      },
      {
        'type': 'bungalo',
        'textContent': 'Бунгало',
        'minCost': 0,
      },
    ];
  };

  var getXhr = function () {
    return new XMLHttpRequest();
  };

  var getXhrListener = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT_VALUE;
  };

  var load = function (onLoad, onError) {
    var xhr = getXhr();
    var URL = GET_URL;
    getXhrListener(xhr, onLoad, onError);
    xhr.open('GET', URL);
    xhr.send();
  };


  window.data = {
    TYPE: getTypes(),
    load: load,
  };
})();
