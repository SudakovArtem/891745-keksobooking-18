'use strict';

(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var MAXIMUM_NUMBER_OF_PINS = 5;

  var fragment = window.util.getFragment();
  var filterForm = document.querySelector('.map__filters');

  var addNode = function (elem) {
    elem.slice(0, MAXIMUM_NUMBER_OF_PINS).forEach(function (item) {
      fragment.appendChild(window.map.renderPin(item));
      window.map.getSimilarMapPinElement().appendChild(fragment);
    });
  };

  var filterByNumber = function (formData, filteredData, attr) {
    var value = formData.get('housing-' + attr);

    if (value !== 'any') {
      filteredData = filteredData.filter(function (pin) {
        return pin.offer[attr] === parseInt(value, 10);
      });
    }

    return filteredData;
  };

  var getFilterData = function () {
    var filteredData = window.data.data;
    var formData = new FormData(filterForm);
    var features = [];

    filterForm.querySelectorAll('.map__features input:checked').forEach(function (checkbox) {
      features.push(checkbox.value);
    });

    if (formData.get('housing-type') !== 'any') {
      filteredData = filteredData.filter(function (pin) {
        return pin.offer.type === formData.get('housing-type');
      });
    }

    if (formData.get('housing-price') !== 'any') {
      filteredData = filteredData.filter(function (pin) {
        var price = 'middle';

        if (pin.offer.price < LOW_PRICE) {
          price = 'low';
        } else if (pin.offer.price > HIGH_PRICE) {
          price = 'high';
        }

        return price === formData.get('housing-price');
      });
    }

    filteredData = filterByNumber(formData, filteredData, 'rooms');

    filteredData = filterByNumber(formData, filteredData, 'guests');

    features.forEach(function (feature) {
      filteredData = filteredData.filter(function (pin) {
        return pin.offer.features.includes(feature);
      });
    });

    return filteredData;
  };

  var filterFormChangeHandler = function () {
    window.page.removePins();
    window.map.removeCard();
    var filteredData = getFilterData();

    addNode(filteredData);
  };

  filterForm.addEventListener('change', window.util.debounce(filterFormChangeHandler));

  window.filter = {
    formChangeHandler: filterFormChangeHandler
  };
})();
