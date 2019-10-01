'use strict';

(function () {
  window.form = document.querySelector('.ad-form');
  var priceInput = window.form.querySelector('#price');
  var titleInput = window.form.querySelector('#title');
  var typeInput = window.form.querySelector('#type');
  var timeinInput = window.form.querySelector('#timein');
  var timeoutInput = window.form.querySelector('#timeout');
  var roomNumberInput = window.form.querySelector('#room_number');
  var capacityInput = window.form.querySelector('#capacity');
  var address = document.querySelector('#address');

  window.form = document.querySelector('.ad-form');

  address.value = window.mapPinMain.style.left + ' ' + // расстояние до острого конца по горизонтали
    window.mapPinMain.style.top; // расстояние до острого конца по вертикали

  priceInput.addEventListener('input', function () {
    if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity('Максимальное значение — 1 000 000');
    } else if (priceInput.validity.badInput) {
      priceInput.setCustomValidity('Неправильный формат значения');
    } else if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Обязательное поле');
    } else {
      priceInput.setCustomValidity('');
    }
  });

  titleInput.addEventListener('input', function () {
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
  });

  var typeInputHandler = function () {
    for (var i = 0; i < window.TYPE.length; i++) {
      if (typeInput.value === window.TYPE[i].type) {
        priceInput.setAttribute('min', window.TYPE[i].minCost);
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
})();
