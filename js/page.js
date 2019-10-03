'use strict';

(function () {
  var offers = window.data.offers;
  var formElement = document.querySelectorAll('.ad-form__element');
  var fragment = window.util.getFragment();
  formElement.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });


  var makePageActive = function () {
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
    return offers;
  };

  window.page = {
    makePageActive: makePageActive
  };
})();
