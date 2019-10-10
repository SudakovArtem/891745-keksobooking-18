'use strict';

(function () {
  var filterForm = window.map.getMapElement().querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var fragment = window.util.getFragment();

  var addNode = function (elem) {
    for (var i = 0; i < window.page.getTakeNumber(elem); i++) {
      fragment.appendChild(window.map.renderPin(elem[i]));
      window.map.getSimilarMapPinElement().appendChild(fragment);
    }
  };

  housingType.addEventListener('change', function (elem) {
    window.page.removePins();
    if (housingType.value !== 'any') {
      var takeNumber = 5;
      elem = window.pins.slice().filter(function (item) {
        return item.offer.type === housingType.value;
      });
      addNode(elem, takeNumber);
    } else {
      elem = window.pins;
      addNode(elem);
    }
  });
})();
