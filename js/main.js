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
var OFFER_MIN_PRICES = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');

var filtersForm = document.querySelector('.map__filters');
var filtersFormFields = filtersForm.querySelectorAll('select, fieldset');

var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('fieldset');
var adFormAddressInput = adForm.querySelector('#address');
var adFormPriceInput = adForm.querySelector('#price');
var adFormTypeSelect = adForm.querySelector('#type');
var adFormTimeField = adForm.querySelector('.ad-form__element--time');
var adFormCheckInTimeSelect = adForm.querySelector('#timein');
var adFormCheckOutTimeSelect = adForm.querySelector('#timeout');

// Вспомогательные функции

var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

// Создание объявлений

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

// Рендер меток

var renderPins = function (offers) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(createPin(offers[i]));
  }

  mapPins.appendChild(fragment);
};

var getMapPinMainCoordinates = function () {
  return {
    x: mapPinMain.offsetLeft + MAIN_PIN_WIDTH / 2,
    y: mapPinMain.offsetTop + MAIN_PIN_HEIGHT
  };
};

// Обработка формы

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

var setAdFormAddress = function (coordinates) {
  adFormAddressInput.value = coordinates.x + ', ' + coordinates.y;
};

var priceChangeHandler = function (evt) {
  var value = evt.target.value;

  if (value === 'bungalo') {
    adFormPriceInput.setAttribute('min', OFFER_MIN_PRICES.bungalo);
    adFormPriceInput.setAttribute('placeholder', OFFER_MIN_PRICES.bungalo);
  } else if (value === 'flat') {
    adFormPriceInput.setAttribute('min', OFFER_MIN_PRICES.flat);
    adFormPriceInput.setAttribute('placeholder', OFFER_MIN_PRICES.flat);
  } else if (value === 'house') {
    adFormPriceInput.setAttribute('min', OFFER_MIN_PRICES.house);
    adFormPriceInput.setAttribute('placeholder', OFFER_MIN_PRICES.house);
  } else if (value === 'palace') {
    adFormPriceInput.setAttribute('min', OFFER_MIN_PRICES.palace);
    adFormPriceInput.setAttribute('placeholder', OFFER_MIN_PRICES.palace);
  }
};

var timeChangeHandler = function (evt) {
  var target = evt.target;

  if (target === adFormCheckInTimeSelect) {
    adFormCheckOutTimeSelect.value = target.value;
  } else {
    adFormCheckInTimeSelect.value = target.value;
  }
};

// Инициализация страницы

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  renderPins(createOffers(OFFER_QUANTITY));
  activateForm(adFormFields);
  activateForm(filtersFormFields);
  setAdFormAddress(getMapPinMainCoordinates());

  adFormTypeSelect.addEventListener('change', priceChangeHandler);
  adFormTimeField.addEventListener('change', timeChangeHandler);

  mapPinMain.removeEventListener('mouseup', mapPinMainClickHandler);
};

var mapPinMainClickHandler = function () {
  activatePage();
};

var resetState = function () {
  deactivateForm(adFormFields);
  deactivateForm(filtersFormFields);

  adFormTypeSelect.removeEventListener('change', priceChangeHandler);
  adFormTimeField.removeEventListener('change', timeChangeHandler);

  mapPinMain.addEventListener('mouseup', mapPinMainClickHandler);
};

resetState();
