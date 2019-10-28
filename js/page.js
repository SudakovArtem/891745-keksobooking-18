'use strict';

(function () {
  var MAP_PIN_MAIN_DEFAULT_X = 570;
  var MAP_PIN_MAIN_DEFAULT_Y = 375;
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';
  var MAX_OFFERS_LENGTH = 5;
  var adFormElement = document.querySelectorAll('.ad-form__element');
  var adFormHeader = document.querySelector('.ad-form-header');
  var main = document.querySelector('main');
  var fragment = window.util.getFragment();
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorElement = errorTemplate.cloneNode(true);
  var successElement = successTemplate.cloneNode(true);
  var errorButton = errorElement.querySelector('.error__button');
  var errorMessage = errorElement.querySelector('.error__message');
  var checkboxes = document.querySelectorAll('input[type=checkbox]');

  adFormHeader.setAttribute('disabled', 'disabled');

  adFormElement.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');

  });

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

  var checkboxPressEnterHandler = function (evt) {
    var enterKeyCode = window.util.getEnterKeyCode();
    if (evt.keyCode === enterKeyCode) {
      evt.target.checked = !evt.target.checked;
    }
  };

  var successHandler = function (offers) {
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    adFormHeader.removeAttribute('disabled');
    adFormElement.forEach(function (item) {
      item.removeAttribute('disabled');
    });

    window.map.getMapElement().classList.remove('map--faded');
    offers.slice(0, MAX_OFFERS_LENGTH).forEach(function (item) {
      fragment.appendChild(window.map.renderPin(item));
    });
    window.map.getSimilarMapPinElement().appendChild(fragment);
    checkboxes.forEach(function (item) {
      item.addEventListener('keydown', checkboxPressEnterHandler);
    });
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
    elem.querySelectorAll('.map__pin[type="button"]').forEach(function (item) {
      elem.removeChild(item);
    });
  };

  var makeAnInitialState = function () {
    var form = window.form.getFormElement();
    form.classList.add('ad-form--disabled');
    adFormHeader.setAttribute('disabled', 'disabled');

    adFormElement.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    removePins();
    window.map.removeCard();
    form.reset();
    var mapPinMain = window.map.getMapPinMainElement();
    mapPinMain.style.left = MAP_PIN_MAIN_DEFAULT_X + 'px';
    mapPinMain.style.top = MAP_PIN_MAIN_DEFAULT_Y + 'px';
    window.map.getMapElement().classList.add('map--faded');
    window.form.setDefaultAddressValue();
    form.querySelector('.ad-form-header__preview img').src = DEFAULT_AVATAR_SRC;
    form.querySelector('.ad-form__photo').innerHTML = '';
    checkboxes.forEach(function (item) {
      item.removeEventListener('keydown', checkboxPressEnterHandler);
      item.checked = false;
    });

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
    makeAnInitialState: makeAnInitialState
  };
})();
