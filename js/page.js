'use strict';

(function () {
  var formElement = document.querySelectorAll('.ad-form__element');
  var fragment = window.util.getFragment();
  formElement.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });

  var successHandler = function (offers) {
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    formElement.forEach(function (item) {
      item.removeAttribute('disabled');
    });

    window.map.getMapElement().classList.remove('map--faded');
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(window.map.renderPin(offers[i]));
    }
    fragment.appendChild(window.map.renderCard(offers[0]));
    window.map.getSimilarMapPinElement().appendChild(fragment);
  };

  var errorHandler = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');
    var main = document.querySelector('main');

    var removeErrorElement = function () {
      var errorElem = main.querySelector('.error');
      if (errorElem) {
        errorElem.remove();
      }
    };

    var errorButtonClickHandler = function () {
      window.data.load(successHandler, errorHandler);
      removeErrorElement();
    };

    errorButton.addEventListener('click', errorButtonClickHandler);

    errorButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.map.getEnterKeycode()) {
        errorButtonClickHandler();
      }
    });

    fragment.appendChild(errorElement);
    main.appendChild(fragment);
  };

  window.page = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
