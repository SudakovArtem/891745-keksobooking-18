'use strict';

(function () {
  var MAP_PIN_MAIN_DEFAULT_X = 570;
  var MAP_PIN_MAIN_DEFAULT_Y = 375;
  var adFormElement = document.querySelectorAll('.ad-form__element');
  var main = document.querySelector('main');
  var fragment = window.util.getFragment();
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorElement = errorTemplate.cloneNode(true);
  var successElement = successTemplate.cloneNode(true);
  var errorButton = errorElement.querySelector('.error__button');
  var errorMessage = errorElement.querySelector('.error__message');

  adFormElement.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });

  var getTakeNumber = function (offers) {
    return offers.length > 5 ? 5 : offers.length;
  };

  var removeErrorElement = function () {
    var errorElem = main.querySelector('.error');
    if (errorElem) {
      errorElem.remove();
    }
  };

  var removeSuccessElement = function () {
    var successElem = main.querySelector('.success');
    if (successElem) {
      successElem.remove();
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

  var errorOverlayEscPressHandler = function (evt) {
    if (evt.keyCode === window.util.getEscKeyCode()) {
      removeErrorElement();
    }
    document.removeEventListener('keydown', errorOverlayEscPressHandler);
  };

  var successOverlayEscPressHandler = function (evt) {
    if (evt.keyCode === window.util.getEscKeyCode()) {
      removeSuccessElement();
    }
    window.removeEventListener('keydown', successOverlayEscPressHandler);
  };

  var successHandler = function (offers) {
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    adFormElement.forEach(function (item) {
      item.removeAttribute('disabled');
    });

    window.map.getMapElement().classList.remove('map--faded');
    for (var i = 0; i < getTakeNumber(offers); i++) {
      fragment.appendChild(window.map.renderPin(offers[i]));
    }
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

  var removePins = function () {
    var elem = window.map.getSimilarMapPinElement();
    var elemPins = elem.querySelectorAll('.map__pin[type="button"]');
    for (var i = 0; i < elemPins.length; i++) {
      elem.removeChild(elemPins[i]);
    }
  };

  var makeAnInitialState = function () {
    document.querySelector('.ad-form').classList.add('ad-form--disabled');

    adFormElement.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    removePins();
    window.map.removeCard();
    window.form.getFormElement().reset();
    var mapPinMain = window.map.getMapPinMainElement();
    mapPinMain.style.left = MAP_PIN_MAIN_DEFAULT_X + 'px';
    mapPinMain.style.top = MAP_PIN_MAIN_DEFAULT_Y + 'px';
    window.map.getMapElement().classList.add('map--faded');
    window.form.setDefaultAddressValue();

    mapPinMain.addEventListener('mousedown', window.map.mapPinMouseDownHandler);
    mapPinMain.addEventListener('mousedown', window.map.pageActiveHandler);
    mapPinMain.addEventListener('keydown', window.map.mapPinPressEnterHandler);
  };

  var formSuccessHandler = function () {
    makeAnInitialState();
    fragment.appendChild(successElement);
    main.appendChild(fragment);
    var successOverlay = main.querySelector('.success');
    successOverlay.addEventListener('click', removeSuccessElement);
    window.addEventListener('keydown', successOverlayEscPressHandler);
  };

  var formErrorHandler = function (errorText) {
    errorMessage.textContent = errorText;
    fragment.appendChild(errorElement);
    main.appendChild(fragment);

    errorButton.addEventListener('click', formErrorButtonClickHandler);

    errorButton.addEventListener('keydown', formErrorButtonPressEnterHandler);

    var errorOverlay = main.querySelector('.error');
    errorOverlay.addEventListener('click', removeErrorElement);
    document.addEventListener('keydown', errorOverlayEscPressHandler);
  };

  window.page = {
    successHandler: successHandler,
    errorHandler: errorHandler,
    formSuccessHandler: formSuccessHandler,
    formErrorHandler: formErrorHandler,
    removePins: removePins,
    getTakeNumber: getTakeNumber,
    makeAnInitialState: makeAnInitialState
  };
})();
