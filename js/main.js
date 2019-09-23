'use strict';

var mapWidth = document.querySelector('.map__pins').offsetWidth;
var ADVERT_LENGTH = 8;
var TYPE = ['palace', 'flat', 'house', 'bungalo']; // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; // массив строк случайной длины из ниже предложенных: 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
var FEATURES_START = 0;
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']; // массив строк случайной длины, содержащий адреса фотографий 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
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

var getRandom = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getSomeIndex = function () {
  return 0.5 - Math.random();
};

var generateMixedArray = function (len) {
  var r = [];
  for (var i = 1; i <= len; i++) {
    r.push(i);
  }
  return r.sort(getSomeIndex);
};

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomList = function (arr, min, max) {
  arr.sort(getSomeIndex);
  var howMuchFeatures = getRandomInRange(min, max);
  var featuresList = [];

  for (var i = 0; i < howMuchFeatures; i++) {
    featuresList.push(arr[i]);
  }
  return featuresList;
};

var addZeros = function (num, size) {
  var s = num + '';
  while (s.length < size) {
    s = '0' + s;
  }
  return s;
};

var getMock = function () {
  var counter = -1;
  var advertArray = [];
  var avatars = generateMixedArray(ADVERT_LENGTH);

  var getImageNumber = function (arr) {
    counter = counter + 1;
    return arr[counter];
  };

  for (var i = 0; i < ADVERT_LENGTH; i++) {
    advertArray[i] = {
      'author': {
        'avatar': 'img/avatars/user' + addZeros(getImageNumber(avatars), 2) + '.png', // строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
      },

      'offer': {
        'title': 'Заголовок объявления', // строка, заголовок предложения
        'address': 'Адрес предложения', // строка, адрес предложения. Для простоты пусть пока представляет собой запись вида '{{location.x}}, {{location.y}}', например, '600, 350'
        'price': getRandomInRange(COST_MIN, COST_MAX) + addZeros('', 3), // число, стоимость
        'type': getRandom(TYPE), // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
        'rooms': getRandomInRange(NUMBER_OF_ROOMS_MIN, NUMBER_OF_ROOMS_MAX), // число, количество комнат
        'guests': getRandomInRange(NUMBER_OF_GUESTS_MIN, NUMBER_OF_GUESTS_MAX), // число, количество гостей, которое можно разместить
        'checkin': getRandomInRange(CHECK_IN_OUT_MIN, CHECK_IN_OUT_MAX) + ':' + addZeros('', 2), // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
        'checkout': getRandomInRange(CHECK_IN_OUT_MIN, CHECK_IN_OUT_MAX) + ':' + addZeros('', 2), // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        'features': getRandomList(FEATURES, FEATURES_START, FEATURES.length), // массив строк случайной длины из ниже предложенных: 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
        'description': 'Описание объекта недвижимости', // строка с описанием,
        'photos': getRandomList(PHOTOS, PHOTOS_START, PHOTOS.length), // массив строк случайной длины, содержащий адреса фотографий 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
      },

      'location': {
        'x': getRandomInRange(LOCATION_X_MIN, LOCATION_X_MAX), // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        'y': getRandomInRange(LOCATION_Y_MIN, LOCATION_Y_MAX), // случайное число, координата y метки на карте от 130 до 630.
      },
    };
  }
  return advertArray;
};

var renderPin = function (elem) {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = mapPinTemplate.cloneNode(true);

  pinElement.style.left = elem.location.x + 'px';
  pinElement.style.top = elem.location.y + 'px';
  pinElement.querySelector('img').src = elem.author.avatar;
  pinElement.querySelector('img').alt = elem.offer.title;

  return pinElement;
};

// ---------------------Задание 3--------------------------------------------

var renderCard = function (elem) {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = mapCardTemplate.cloneNode(true);
  var photos = cardElement.querySelector('.popup__photos');

  var getPhotos = function (val) {
    val.innerHTML = '';
    for (var i = 0; i < elem.offer.photos.length; i++) {
      val.insertAdjacentHTML('afterbegin', '<img src="' + elem.offer.photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    }
  };

  var getType = function () {
    switch (elem.offer.type) {
      case 'palace':
        cardElement.querySelector('.popup__type').textContent = 'Дворец';
        break;
      case 'flat':
        cardElement.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'house':
        cardElement.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'bungalo':
        cardElement.querySelector('.popup__type').textContent = 'Бунгало';
        break;
    }
  };

  cardElement.querySelector('.popup__title').textContent = elem.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = elem.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = elem.offer.price + '₽/ночь';
  getType();
  cardElement.querySelector('.popup__text--capacity ').textContent = elem.offer.rooms + ' комнаты для ' + elem.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + elem.offer.checkin + ', выезд до ' + elem.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = elem.offer.features.toString();
  cardElement.querySelector('.popup__description').textContent = elem.offer.description;
  cardElement.querySelector('.popup__photos > img').src = elem.offer.photos[0];
  getPhotos(photos);
  cardElement.querySelector('.popup__avatar').src = elem.author.avatar;

  return cardElement;
};

// ---------------------Задание 3--------------------------------------------

var getSimilarAdverts = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  var similarMapPin = map.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var offers = getMock();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }
  fragment.appendChild(renderCard(offers[0])); // Задание 3
  similarMapPin.appendChild(fragment);
  return offers;
};

getSimilarAdverts();
