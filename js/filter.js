'use strict';

(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var fragment = window.util.getFragment();
  var filterForm = document.querySelector('.map__filters');

  var addNode = function (elem) {
    for (var i = 0; i < window.page.getTakeNumber(elem); i++) {
      fragment.appendChild(window.map.renderPin(elem[i]));
      window.map.getSimilarMapPinElement().appendChild(fragment);
    }
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

    if (features.length > 0) {
      features.forEach(function (feature) {
        filteredData = filteredData.filter(function (pin) {
          return pin.offer.features.includes(feature);
        });
      });
    }

    return filteredData;
  };

  filterForm.addEventListener('change', function () {
    window.page.removePins();
    var filteredData = getFilterData();

    addNode(filteredData);
  });
})();
