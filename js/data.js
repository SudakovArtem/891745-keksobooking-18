'use strict';

(function () {
  var mapWidth = document.querySelector('.map__pins').offsetWidth;
  var ADVERT_LENGTH = 8;
  window.TYPE = [
    {
      'type': 'palace',
      'textContent': 'Дворец',
      'minCost': 10000

    },
    {
      'type': 'flat',
      'textContent': 'Квартира',
      'minCost': 1000

    },
    {
      'type': 'house',
      'textContent': 'Дом',
      'minCost': 5000

    },
    {
      'type': 'bungalo',
      'textContent': 'Бунгало',
      'minCost': 0
    }
  ];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var FEATURES_START = 0;
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var PHOTOS_START = 0;
  var COST_MIN = 1;
  var COST_MAX = 50;
  var NUMBER_OF_ROOMS_MIN = 1;
  var NUMBER_OF_ROOMS_MAX = 5;
  var NUMBER_OF_GUESTS_MIN = 1;
  var NUMBER_OF_GUESTS_MAX = 5;
  var CHECK_IN_OUT_MIN = 12;
  var CHECK_IN_OUT_MAX = 14;
  var LOCATION_X_MIN = 0;
  var LOCATION_X_MAX = mapWidth;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

  window.getMock = function () {
    var counter = -1;
    var advertArray = [];
    var avatars = window.generateMixedArray(ADVERT_LENGTH);

    var getImageNumber = function (arr) {
      counter = counter + 1;
      return arr[counter];
    };

    for (var i = 0; i < ADVERT_LENGTH; i++) {
      advertArray[i] = {
        'author': {
          'avatar': 'img/avatars/user' + window.addZeros(getImageNumber(avatars), 2) + '.png', // строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
        },

        'offer': {
          'title': 'Заголовок объявления', // строка, заголовок предложения
          'address': 'Адрес предложения', // строка, адрес предложения. Для простоты пусть пока представляет собой запись вида '{{location.x}}, {{location.y}}', например, '600, 350'
          'price': window.getRandomInRange(COST_MIN, COST_MAX) + window.addZeros('', 3), // число, стоимость
          'type': window.getRandom(window.TYPE).type, // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
          'rooms': window.getRandomInRange(NUMBER_OF_ROOMS_MIN, NUMBER_OF_ROOMS_MAX), // число, количество комнат
          'guests': window.getRandomInRange(NUMBER_OF_GUESTS_MIN, NUMBER_OF_GUESTS_MAX), // число, количество гостей, которое можно разместить
          'checkin': window.getRandomInRange(CHECK_IN_OUT_MIN, CHECK_IN_OUT_MAX) + ':' + window.addZeros('', 2), // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
          'checkout': window.getRandomInRange(CHECK_IN_OUT_MIN, CHECK_IN_OUT_MAX) + ':' + window.addZeros('', 2), // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
          'features': window.getRandomList(FEATURES, FEATURES_START, FEATURES.length), // массив строк случайной длины из ниже предложенных: 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
          'description': 'Описание объекта недвижимости', // строка с описанием,
          'photos': window.getRandomList(PHOTOS, PHOTOS_START, PHOTOS.length), // массив строк случайной длины, содержащий адреса фотографий 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
        },

        'location': {
          'x': window.getRandomInRange(LOCATION_X_MIN, LOCATION_X_MAX), // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
          'y': window.getRandomInRange(LOCATION_Y_MIN, LOCATION_Y_MAX), // случайное число, координата y метки на карте от 130 до 630.
        },
      };
    }
    return advertArray;
  };
})();
