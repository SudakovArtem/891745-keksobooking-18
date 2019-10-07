'use strict';

(function () {
  var MAP_PIN_MAIN_DEFAULT_X = 570;
  var MAP_PIN_MAIN_DEFAULT_Y = 375;
  var adFormElement = document.querySelectorAll('.ad-form__element');
  var main = document.querySelector('main');
  var fragment = window.util.getFragment();
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorElement = errorTemplate.cloneNode(true);
  var errorButton = errorElement.querySelector('.error__button');

  adFormElement.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });

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

  var formErrorButtonClickHandler = function () {
    removeErrorElement();
    errorButton.removeEventListener('click', formErrorButtonClickHandler);
  };

  var formErrorButtonPressEnterHandler = function (evt) {
    if (evt.keyCode === window.util.getEnterKeyCode()) {
      removeErrorElement();
    }
    errorButton.removeEventListener('keydown', formErrorButtonPressEnterHandler);
  };

  var overlayEscPressHandler = function (evt) {
    if (evt.keyCode === window.util.getEscKeyCode()) {
      removeErrorElement();
    }
    document.removeEventListener('keydown', overlayEscPressHandler);
  };

  var successHandler = function (offers) {
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    adFormElement.forEach(function (item) {
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
    errorButton.addEventListener('click', errorButtonClickHandler);

    errorButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.getEnterKeyCode()) {
        errorButtonClickHandler();
      }
    });

    fragment.appendChild(errorElement);
    main.appendChild(fragment);
  };

  var formSuccessHandler = function () {
    document.querySelector('.ad-form').classList.add('ad-form--disabled');

    adFormElement.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    var elem = window.map.getSimilarMapPinElement();
    var elemPins = elem.querySelectorAll('.map__pin[type="button"]');
    for (var i = 0; i < elemPins.length; i++) {
      elem.removeChild(elemPins[i]);
    }
    window.map.removeCard();
    window.form.getFormElement().reset();
    var mapPinMain = window.map.getMapPinMainElement();
    mapPinMain.style.left = MAP_PIN_MAIN_DEFAULT_X + 'px';
    mapPinMain.style.top = MAP_PIN_MAIN_DEFAULT_Y + 'px';
    window.map.getMapElement().classList.add('map--faded');

    mapPinMain.addEventListener('mousedown', window.map.mapPinMouseDownHandler);
    mapPinMain.addEventListener('mousedown', window.map.pageActiveHandler);
    mapPinMain.addEventListener('keydown', window.map.mapPinPressEnterHandler);
  };

  var formErrorHandler = function () {
    fragment.appendChild(errorElement);
    main.appendChild(fragment);

    errorButton.addEventListener('click', formErrorButtonClickHandler);

    errorButton.addEventListener('keydown', formErrorButtonPressEnterHandler);

    var overlay = main.querySelector('.error');
    overlay.addEventListener('click', removeErrorElement);
    document.addEventListener('keydown', overlayEscPressHandler);
  };

  window.page = {
    successHandler: successHandler,
    errorHandler: errorHandler,
    formSuccessHandler: formSuccessHandler,
    formErrorHandler: formErrorHandler,
  };
})();
