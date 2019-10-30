'use strict';

(function () {
  var AD_ERROR_MESSAGE = 'Ошибка загрузки объявления';
  var DEFAULT_ADDRESS_VALUE = '585 375';
  var ROOMS_CAPACITY = {
    '1': [1],
    '2': [2, 1],
    '3': [3, 2, 1],
    '100': [0]
  };

  var form = document.querySelector('.ad-form');
  var priceInput = form.querySelector('#price');
  var titleInput = form.querySelector('#title');
  var typeInput = form.querySelector('#type');
  var timeinInput = form.querySelector('#timein');
  var timeoutInput = form.querySelector('#timeout');
  var roomNumberInput = form.querySelector('#room_number');
  var capacityInput = form.querySelector('#capacity');
  var address = document.querySelector('#address');
  var formResetButton = document.querySelector('.ad-form__reset');

  var getFormElement = function () {
    return form;
  };

  var setDefaultAddressValue = function () {
    address.value = DEFAULT_ADDRESS_VALUE;
  };

  setDefaultAddressValue();

  var getAddressValue = function (obj) {
    address.value = Math.floor(obj.x) + ' ' + Math.floor(obj.y);
  };

  var priceInputHandler = function () {
    if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity('Максимальное значение — 1 000 000');
    } else if (priceInput.validity.badInput) {
      priceInput.setCustomValidity('Неправильный формат значения');
    } else if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Обязательное поле');
    } else {
      priceInput.setCustomValidity('');
    }
  };

  var titleInputHandler = function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (titleInput.validity.badInput) {
      titleInput.setCustomValidity('Неправильный формат значения');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  };

  var typeInputHandler = function () {
    priceInput.setAttribute('min', window.data.TYPE.filter(function (item) {
      return item.type === typeInput.value;
    })[0].minCost);
  };

  var roomNumberInputHandler = function (evt) {
    var capacity = ROOMS_CAPACITY[evt.target.value];
    var options = capacityInput.querySelectorAll('option');

    options.forEach(function (item, i) {
      capacityInput.querySelector('.capacity' + i).disabled = true;
      capacityInput.querySelector('.capacity' + i).selected = false;
    });

    capacityInput.querySelector('.capacity' + capacity[0]).selected = true;

    capacity.forEach(function (item, i) {
      capacityInput.querySelector('.capacity' + capacity[i]).disabled = false;
    });
  };

  var formSubmitHandler = function (evt) {
    window.data.upload(new FormData(form), window.page.formSuccessHandler, function () {
      window.page.formErrorHandler(AD_ERROR_MESSAGE);
    });
    evt.preventDefault();
  };

  var formPressEnterHandler = function (evt) {
    if (evt.keyCode === window.util.getEnterKeyCode() && evt.target.parentElement.classList.contains('features')) {
      evt.preventDefault();
    }
  };

  typeInput.addEventListener('change', typeInputHandler);

  timeinInput.addEventListener('change', function (evt) {
    timeoutInput.value = evt.target.value;
  });

  timeoutInput.addEventListener('change', function (evt) {
    timeinInput.value = evt.target.value;
  });


  roomNumberInput.addEventListener('change', roomNumberInputHandler);

  priceInput.addEventListener('input', priceInputHandler);

  titleInput.addEventListener('input', titleInputHandler);

  form.addEventListener('submit', formSubmitHandler);

  form.addEventListener('keydown', formPressEnterHandler);

  formResetButton.addEventListener('click', function () {
    window.page.makeAnInitialState();
  });

  window.form = {
    getAddressValue: getAddressValue,
    getFormElement: getFormElement,
    setDefaultAddressValue: setDefaultAddressValue,
    pressEnterHandler: formPressEnterHandler
  };
})();
