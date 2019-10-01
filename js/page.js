'use strict';

(function () {
  window.similarMapPin = window.map.querySelector('.map__pins');
  var offers = window.getMock();
  var formElement = window.form.querySelectorAll('.ad-form__element');

  formElement.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });


  window.makePageActive = function () {
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    formElement.forEach(function (item) {
      item.removeAttribute('disabled');
    });

    window.map.classList.remove('map--faded');
    for (var i = 0; i < offers.length; i++) {
      window.fragment.appendChild(window.renderPin(offers[i]));

    }
    window.fragment.appendChild(window.renderCard(offers[0]));
    window.similarMapPin.appendChild(window.fragment);
    return offers;
  };
})();
