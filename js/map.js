'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var CURRENCY = '₽/ночь';
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = mapCardTemplate.cloneNode(true);


  var getMapElement = function () {
    return document.querySelector('.map');
  };

  var getSimilarMapPinElement = function () {
    return document.querySelector('.map__pins');
  };

  var getMapPinCoordinate = function () {
    return mapPinMain.style.left + ' ' + // расстояние до острого конца по горизонтали
      mapPinMain.style.top; // расстояние до острого конца по вертикали
  };



  // --------------------------------------------------------------------------------------------------------------

  var mapPinClickHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    window.makePageActive();
    mapPinMain.removeEventListener('mousedown', mapPinClickHandler);
    mapPinMain.removeEventListener('keydown', mapPinPressEnterHandler);
  };


  //- ---------------------------------------------------------------------------------------------------------------





  var mapPinPressEnterHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.makePageActive();
      mapPinMain.removeEventListener('keydown', mapPinPressEnterHandler);
      mapPinMain.removeEventListener('mousedown', mapPinClickHandler);
    }
  };

  mapPinMain.addEventListener('mousedown', mapPinClickHandler);
  mapPinMain.addEventListener('keydown', mapPinPressEnterHandler);

  var removeCard = function () {
    var cardElem = getMapElement().querySelector('.map__card');
    if (cardElem) {
      cardElem.remove();
    }
  };

  var cardPopupEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removeCard();
    }
    document.removeEventListener('keydown', cardPopupEscPressHandler);
  };

  var insertPhotos = function (elem, block) {
    block.innerHTML = '';
    for (var i = 0; i < elem.offer.photos.length; i++) {
      block.insertAdjacentHTML('afterbegin', '<img src="' + elem.offer.photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    }
  };

  var insertFeatures = function (elem, block) {
    block.innerHTML = '';
    for (var i = 0; i < elem.offer.features.length; i++) {
      block.insertAdjacentHTML('afterbegin', '<li class="popup__feature popup__feature--' + elem.offer.features[i] + '"></li>');
    }
  };

  var insertType = function (elem) {
    var popupType = cardElement.querySelector('.popup__type');
    for (var i = 0; i < window.data.TYPE.length; i++) {
      if (elem.offer.type === window.data.TYPE[i].type) {
        popupType.textContent = window.data.TYPE[i].textContent;
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


  var renderPin = function (elem) {
    var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = mapPinTemplate.cloneNode(true);
    var fragment = window.util.getFragment();

    var mapCardPopupOpenHandler = function () {
      fragment.appendChild(renderCard(elem));
      removeCard();
      getSimilarMapPinElement().appendChild(fragment);
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
    var photos = cardElement.querySelector('.popup__photos');
    var features = cardElement.querySelector('.popup__features');
    var closeButton = cardElement.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      removeCard();
      document.removeEventListener('keydown', cardPopupEscPressHandler);
    });


    cardElement.querySelector('.popup__title').textContent = elem.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = elem.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = elem.offer.price + CURRENCY;
    insertType(elem);
    cardElement.querySelector('.popup__text--capacity ').textContent = getCapacityStr(elem.offer.rooms, elem.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = getTimeStr(elem.offer.checkin, elem.offer.checkout);
    insertFeatures(elem, features);
    cardElement.querySelector('.popup__description').textContent = elem.offer.description;
    cardElement.querySelector('.popup__photos > img').src = elem.offer.photos[0];
    insertPhotos(elem, photos);
    cardElement.querySelector('.popup__avatar').src = elem.author.avatar;

    document.addEventListener('keydown', cardPopupEscPressHandler);

    return cardElement;
  };

  window.map = {
    getMapElement: getMapElement,
    getMapPinCoordinate: getMapPinCoordinate,
    getSimilarMapPinElement: getSimilarMapPinElement,
    renderCard: renderCard,
    renderPin: renderPin
  };
})();
