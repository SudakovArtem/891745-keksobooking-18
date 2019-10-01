'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var CURRENCY = '₽/ночь';
  window.mapPinMain = document.querySelector('.map__pin--main');
  window.map = document.querySelector('.map');

  var mapPinClickHandler = function () {
    window.makePageActive();
    window.mapPinMain.removeEventListener('mousedown', mapPinClickHandler);
    window.mapPinMain.removeEventListener('keydown', mapPinPressEnterHandler);
  };

  var mapPinPressEnterHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.makePageActive();
      window.mapPinMain.removeEventListener('keydown', mapPinPressEnterHandler);
      window.mapPinMain.removeEventListener('mousedown', mapPinClickHandler);
    }
  };

  window.mapPinMain.addEventListener('mousedown', mapPinClickHandler);
  window.mapPinMain.addEventListener('keydown', mapPinPressEnterHandler);

  var removeCard = function () {
    var cardElement = window.map.querySelector('.map__card');
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

  window.renderPin = function (elem) {
    var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = mapPinTemplate.cloneNode(true);

    var mapCardPopupOpenHandler = function () {
      window.fragment.appendChild(window.renderCard(elem));
      removeCard();
      window.similarMapPin.appendChild(window.fragment);
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

  window.renderCard = function (elem) {
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
      for (var i = 0; i < window.TYPE.length; i++) {
        if (elem.offer.type === window.TYPE[i].type) {
          popupType.textContent = window.TYPE[i].textContent;
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
})();
