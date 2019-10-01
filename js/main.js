'use strict';

var mapWidth = document.querySelector('.map__pins').offsetWidth;
var ADVERT_LENGTH = 8;
var TYPE = [
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
var CURRENCY = '₽/ночь';
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var form = document.querySelector('.ad-form');
var mapPinMain = document.querySelector('.map__pin--main');
var formElement = form.querySelectorAll('.ad-form__element');
var address = document.querySelector('#address');
var priceInput = form.querySelector('#price');
var titleInput = form.querySelector('#title');
var typeInput = form.querySelector('#type');
var timeinInput = form.querySelector('#timein');
var timeoutInput = form.querySelector('#timeout');
var roomNumberInput = form.querySelector('#room_number');
var capacityInput = form.querySelector('#capacity');
var map = document.querySelector('.map');
var similarMapPin = map.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

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
        'type': getRandom(TYPE).type, // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
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

var offers = getMock();

var removeCard = function () {
  var cardElement = map.querySelector('.map__card');
  if (cardElement) {
    cardElement.remove();
  }
};

var cardPopupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    removeCard();
  }
  document.removeEventListener('keydown', cardPopupEscPressHandler);
};

var renderPin = function (elem) {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = mapPinTemplate.cloneNode(true);

  var mapCardPopupOpenHandler = function () {
    fragment.appendChild(renderCard(elem));
    removeCard();
    similarMapPin.appendChild(fragment);
  };

  pinElement.style.left = elem.location.x + 'px';
  pinElement.style.top = elem.location.y + 'px';
  pinElement.querySelector('img').src = elem.author.avatar;
  pinElement.querySelector('img').alt = elem.offer.title;

  pinElement.addEventListener('click', mapCardPopupOpenHandler);

  pinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      mapCardPopupOpenHandler();
    }
  });

  return pinElement;
};

var renderCard = function (elem) {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = mapCardTemplate.cloneNode(true);
  var photos = cardElement.querySelector('.popup__photos');
  var features = cardElement.querySelector('.popup__features');
  var closeButton = cardElement.querySelector('.popup__close');
  closeButton.addEventListener('click', function () {
    removeCard();
    document.removeEventListener('keydown', cardPopupEscPressHandler);
  });

  var insertPhotos = function (block) {
    block.innerHTML = '';
    for (var i = 0; i < elem.offer.photos.length; i++) {
      block.insertAdjacentHTML('afterbegin', '<img src="' + elem.offer.photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    }
  };

  var insertFeatures = function (block) {
    block.innerHTML = '';
    for (var i = 0; i < elem.offer.features.length; i++) {
      block.insertAdjacentHTML('afterbegin', '<li class="popup__feature popup__feature--' + elem.offer.features[i] + '"></li>');
    }
  };

  var insertType = function () {
    var popupType = cardElement.querySelector('.popup__type');
    for (var i = 0; i < TYPE.length; i++) {
      if (elem.offer.type === TYPE[i].type) {
        popupType.textContent = TYPE[i].textContent;
        break;
      }
    }
  };

  var getCapacityStr = function (numberOfRooms, numberOfGuests) {
    return numberOfRooms + ' комнаты для ' + numberOfGuests + ' гостей';
  };

  var getTimeStr = function (checkinTime, checkoutTime) {
    return checkinTime + ' комнаты для ' + checkoutTime + ' гостей';
  };

  cardElement.querySelector('.popup__title').textContent = elem.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = elem.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = elem.offer.price + CURRENCY;
  insertType();
  cardElement.querySelector('.popup__text--capacity ').textContent = getCapacityStr(elem.offer.rooms, elem.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = getTimeStr(elem.offer.checkin, elem.offer.checkout);
  insertFeatures(features);
  cardElement.querySelector('.popup__description').textContent = elem.offer.description;
  cardElement.querySelector('.popup__photos > img').src = elem.offer.photos[0];
  insertPhotos(photos);
  cardElement.querySelector('.popup__avatar').src = elem.author.avatar;

  document.addEventListener('keydown', cardPopupEscPressHandler);

  return cardElement;
};

var makePageActive = function () {
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');

  formElement.forEach(function (item) {
    item.removeAttribute('disabled');
  });

  map.classList.remove('map--faded');
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));

  }
  fragment.appendChild(renderCard(offers[0]));
  similarMapPin.appendChild(fragment);
  return offers;
};

formElement.forEach(function (item) {
  item.setAttribute('disabled', 'disabled');
});

address.value = mapPinMain.style.left + ' ' + // расстояние до острого конца по горизонтали
  mapPinMain.style.top; // расстояние до острого конца по вертикали

var mapPinClickHandler = function () {
  makePageActive();
  mapPinMain.removeEventListener('mousedown', mapPinClickHandler);
  mapPinMain.removeEventListener('keydown', mapPinPressEnterHandler);
};

var mapPinPressEnterHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    makePageActive();
    mapPinMain.removeEventListener('keydown', mapPinPressEnterHandler);
    mapPinMain.removeEventListener('mousedown', mapPinClickHandler);
  }
};

mapPinMain.addEventListener('mousedown', mapPinClickHandler);
mapPinMain.addEventListener('keydown', mapPinPressEnterHandler);

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
  for (var i = 0; i < TYPE.length; i++) {
    if (typeInput.value === TYPE[i].type) {
      priceInput.setAttribute('min', TYPE[i].minCost);
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

