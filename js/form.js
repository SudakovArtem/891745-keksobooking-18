'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var priceInput = form.querySelector('#price');
  var titleInput = form.querySelector('#title');
  var typeInput = form.querySelector('#type');
  var timeinInput = form.querySelector('#timein');
  var timeoutInput = form.querySelector('#timeout');
  var roomNumberInput = form.querySelector('#room_number');
  var capacityInput = form.querySelector('#capacity');
  var address = document.querySelector('#address');

  address.value = window.map.getMapPinCoordinate();

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
    for (var i = 0; i < window.data.TYPE.length; i++) {
      if (typeInput.value === window.data.TYPE[i].type) {
        priceInput.setAttribute('min', window.data.TYPE[i].minCost);
        break;
      }
    }
  };

  var timeinInputHandler = function () {
    for (var i = 0; i < timeinInput.children.length; i++) {
      if (timeinInput.children[i].selected) {
        timeoutInput.children[i].selected = true;
      }
    }
  };

  var timeoutInputHandler = function () {
    for (var i = 0; i < timeoutInput.children.length; i++) {
      if (timeoutInput.children[i].selected) {
        timeinInput.children[i].selected = true;
      }
    }
  };

  var roomNumberInputHandler = function () {
    for (var i = 0; i < capacityInput.children.length; i++) {
      if (roomNumberInput.value < capacityInput.children[i].value && !capacityInput.children[i].hasAttribute('disabled')) {
        capacityInput.children[i].setAttribute('disabled', 'disabled');
      } else if (roomNumberInput.value >= capacityInput.children[i].value && capacityInput.children[i].hasAttribute('disabled')) {
        capacityInput.children[i].removeAttribute('disabled');
      }
    }
    if (roomNumberInput.value === '0') {
      capacityInput.querySelector('option[selected]').removeAttribute('selected');
      capacityInput.querySelector('option[value="0"]').setAttribute('selected', 'selected');
    }
  };

  typeInput.addEventListener('change', typeInputHandler);

  timeinInput.addEventListener('change', timeinInputHandler);

  timeoutInput.addEventListener('change', timeoutInputHandler);

  roomNumberInput.addEventListener('change', roomNumberInputHandler);

  priceInput.addEventListener('input', priceInputHandler);

  titleInput.addEventListener('input', titleInputHandler);
})();
