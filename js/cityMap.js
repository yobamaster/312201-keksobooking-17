'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 84;

  var MAP_X_MIN = 0 + PIN_WIDTH / 2;
  var MAP_X_MAX = 1200 - PIN_WIDTH / 2;
  var MAP_Y_MIN = 130 + PIN_HEIGHT;
  var MAP_Y_MAX = 630 + PIN_HEIGHT;

  var mapPinMainPositionLimit = {
    top: 130,
    right: 1200 - MAIN_PIN_WIDTH,
    bottom: 630,
    left: 0
  };

  var mapMain = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinMain = document.querySelector('.map__pin--main');

  // Рендер меток

  var createPin = function (data) {
    var mapPin = mapPinTemplate.cloneNode(true);
    var img = mapPin.querySelector('img');

    mapPin.style.left = data.location.x - PIN_WIDTH / 2 + 'px';
    mapPin.style.top = data.location.y - PIN_HEIGHT + 'px';
    img.src = data.author.avatar;
    img.alt = data.offer.title;

    mapPin.addEventListener('click', function () {
      window.card.showCardPopup(data);
      mapPin.classList.add('map__pin--active');
    });

    return mapPin;
  };

  var renderPins = function (offers) {
    var fragment = document.createDocumentFragment();

    offers.forEach(function (element) {
      fragment.appendChild(createPin(element));
    });

    mapPins.appendChild(fragment);
  };

  var removePins = function () {
    var pinsList = document.querySelectorAll('.map__pins > button:not(.map__pin--main)');

    pinsList.forEach(function (pin) {
      pin.remove();
    });
  };

  // Перемещение маркера

  var getMapPinMainCoordinates = function () {
    return {
      x: mapPinMain.offsetLeft + MAIN_PIN_WIDTH / 2,
      y: mapPinMain.offsetTop + MAIN_PIN_HEIGHT
    };
  };

  var coordinates = {
    x: null,
    y: null
  };

  var mouseMoveHandler = function (evt) {
    evt.preventDefault();

    var shift = {
      x: coordinates.x - evt.clientX,
      y: coordinates.y - evt.clientY
    };

    coordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var shiftX = mapPinMain.offsetLeft - shift.x;
    var shiftY = mapPinMain.offsetTop - shift.y;

    if (shiftX < mapPinMainPositionLimit.left) {
      mapPinMain.style.left = mapPinMainPositionLimit.left + 'px';
    } else if (shiftX > mapPinMainPositionLimit.right) {
      mapPinMain.style.left = mapPinMainPositionLimit.right + 'px';
    } else if (shiftY < mapPinMainPositionLimit.top) {
      mapPinMain.style.top = mapPinMainPositionLimit.top + 'px';
    } else if (shiftY > mapPinMainPositionLimit.bottom) {
      mapPinMain.style.top = mapPinMainPositionLimit.bottom + 'px';
    } else {
      mapPinMain.style.left = shiftX + 'px';
      mapPinMain.style.top = shiftY + 'px';
    }
  };

  var mouseUpHandler = function (evt) {
    evt.preventDefault();

    window.form.setAdFormAddress(getMapPinMainCoordinates());

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  var mapPinMainMoveHandler = function (evt) {
    evt.preventDefault();

    coordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  window.cityMap = {
    MAP_X_MIN: MAP_X_MIN,
    MAP_X_MAX: MAP_X_MAX,
    MAP_Y_MIN: MAP_Y_MIN,
    MAP_Y_MAX: MAP_Y_MAX,
    mapMain: mapMain,
    mapPinMain: mapPinMain,
    renderPins: renderPins,
    removePins: removePins,
    mapPinMainMoveHandler: mapPinMainMoveHandler
  };

})();
