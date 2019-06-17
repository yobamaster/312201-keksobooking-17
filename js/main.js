'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 84;

var MAP_X_MIN = 0 + PIN_WIDTH / 2;
var MAP_X_MAX = 1200 - PIN_WIDTH / 2;
var MAP_Y_MIN = 130 + PIN_HEIGHT;
var MAP_Y_MAX = 630 + PIN_HEIGHT;

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TITLES = ['Объявление 1', 'Объявление 2', 'Объявление 3', 'Объявление 4', 'Объявление 5', 'Объявление 6', 'Объявление 7', 'Объявление 8'];
var OFFER_QUANTITY = 8;

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');

var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('fieldset');
var adFormAddressInput = adForm.querySelector('#address');
var filtersForm = document.querySelector('.map__filters');
var filtersFormFields = filtersForm.querySelectorAll('select, fieldset');

var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

var getAvatar = function (count) {
  return 'img/avatars/user0' + count + '.png';
};

var getRandomPosition = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var createOffer = function (count) {
  return {
    'author': {
      'avatar': getAvatar(count),
    },

    'offer': {
      'type': getRandomElement(OFFER_TYPES),
      'title': getRandomElement(OFFER_TITLES)
    },

    'location': {
      'x': getRandomPosition(MAP_X_MIN, MAP_X_MAX),
      'y': getRandomPosition(MAP_Y_MIN, MAP_Y_MAX),
    }
  };
};

var createOffers = function (count) {
  var offers = [];

  for (var i = 1; i <= count; i++) {
    var offer = createOffer(i);
    offers.push(offer);
  }

  return offers;
};

var createPin = function (offer) {
  var mapPin = mapPinTemplate.cloneNode(true);
  var img = mapPin.querySelector('img');

  mapPin.style.left = offer.location.x - PIN_WIDTH / 2 + 'px';
  mapPin.style.top = offer.location.y - PIN_HEIGHT + 'px';
  img.src = offer.author.avatar;
  img.alt = offer.offer.title;

  return mapPin;
};

var renderPins = function (offers) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(createPin(offers[i]));
  }

  mapPins.appendChild(fragment);
};

var deactivateForm = function (formFields) {
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].setAttribute('disabled', '');
  }
};

var activateForm = function (formFields) {
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].removeAttribute('disabled');
  }
};

var getMapPinMainCoordinates = function () {
  return {
    x: mapPinMain.offsetLeft + MAIN_PIN_WIDTH / 2,
    y: mapPinMain.offsetTop + MAIN_PIN_HEIGHT
  };
};

var setAdFormAddress = function (coordinates) {
  adFormAddressInput.value = coordinates.x + ', ' + coordinates.y;
};

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  renderPins(createOffers(OFFER_QUANTITY));
  activateForm(adFormFields);
  activateForm(filtersFormFields);
  setAdFormAddress(getMapPinMainCoordinates());

  mapPinMain.removeEventListener('mouseup', mapPinMainClickHandler);
};

var mapPinMainClickHandler = function () {
  activatePage();
};

var resetState = function () {
  deactivateForm(adFormFields);
  deactivateForm(filtersFormFields);

  mapPinMain.addEventListener('mouseup', mapPinMainClickHandler);
};

resetState();
