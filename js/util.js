'use strict';

(function () {
  var getEnterKeycode = function () {
    return 13;
  };

  var getFragment = function () {
    return document.createDocumentFragment();
  };

  window.getRandom = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  window.getSomeIndex = function () {
    return 0.5 - Math.random();
  };

  window.generateMixedArray = function (len) {
    var r = [];
    for (var i = 1; i <= len; i++) {
      r.push(i);
    }
    return r.sort(window.getSomeIndex);
  };

  window.getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.getRandomList = function (arr, min, max) {
    arr.sort(window.getSomeIndex);
    var howMuchFeatures = window.getRandomInRange(min, max);
    var featuresList = [];

    for (var i = 0; i < howMuchFeatures; i++) {
      featuresList.push(arr[i]);
    }
    return featuresList;
  };

  window.addZeros = function (num, size) {
    var s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  };

  window.util = {
    getFragment: getFragment,
    getEnterKeycode: getEnterKeycode
  };
})();
