'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var MAIN_PIN_WIDTH = 64;
var MAIN_PIN_HEIGHT = 84;

var MAP_X_MIN = 0 + PIN_WIDTH / 2;
var MAP_X_MAX = 1200 - PIN_WIDTH / 2;
var MAP_Y_MIN = 130 + PIN_HEIGHT;
var MAP_Y_MAX = 630 + PIN_HEIGHT;

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TITLES = ['Объявление 1', 'Объявление 2', 'Объявление 3', 'Объявление 4', 'Объявление 5', 'Объявление 6', 'Объявление 7', 'Объявление 8'];
var OFFER_QUANTITY = 8;
var OFFER_MIN_PRICE = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var mapPinMainPositionLimit = {
  top: 130,
  right: 1200 - MAIN_PIN_WIDTH,
  bottom: 630,
  left: 0
};

var isPageActive = false;

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');

var filtersForm = document.querySelector('.map__filters');
var filtersFormFields = filtersForm.querySelectorAll('select, fieldset');

var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('fieldset');
var adFormTitleInput = adForm.querySelector('#title');
var adFormAddressInput = adForm.querySelector('#address');
var adFormPriceInput = adForm.querySelector('#price');
var adFormTypeSelect = adForm.querySelector('#type');
var adFormCapacitySelect = adForm.querySelector('#capacity');
var adFormRoomNumberSelect = adForm.querySelector('#room_number');
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
    adFormPriceInput.setAttribute('min', OFFER_MIN_PRICE.bungalo);
    adFormPriceInput.setAttribute('placeholder', OFFER_MIN_PRICE.bungalo);
  } else if (value === 'flat') {
    adFormPriceInput.setAttribute('min', OFFER_MIN_PRICE.flat);
    adFormPriceInput.setAttribute('placeholder', OFFER_MIN_PRICE.flat);
  } else if (value === 'house') {
    adFormPriceInput.setAttribute('min', OFFER_MIN_PRICE.house);
    adFormPriceInput.setAttribute('placeholder', OFFER_MIN_PRICE.house);
  } else if (value === 'palace') {
    adFormPriceInput.setAttribute('min', OFFER_MIN_PRICE.palace);
    adFormPriceInput.setAttribute('placeholder', OFFER_MIN_PRICE.palace);
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

var capacityChangeHandler = function (evt) {
  var value = evt.target.value;

  if (value === '1') {
    adFormCapacitySelect.options[0].setAttribute('disabled', true);
    adFormCapacitySelect.options[1].setAttribute('disabled', true);
    adFormCapacitySelect.options[2].removeAttribute('disabled');
    adFormCapacitySelect.options[3].setAttribute('disabled', true);
    adFormCapacitySelect.value = 1;
  } else if (value === '2') {
    adFormCapacitySelect.options[0].setAttribute('disabled', true);
    adFormCapacitySelect.options[1].removeAttribute('disabled');
    adFormCapacitySelect.options[2].removeAttribute('disabled');
    adFormCapacitySelect.options[3].setAttribute('disabled', true);
    adFormCapacitySelect.value = 2;
  } else if (value === '3') {
    adFormCapacitySelect.options[0].removeAttribute('disabled');
    adFormCapacitySelect.options[1].removeAttribute('disabled');
    adFormCapacitySelect.options[2].removeAttribute('disabled');
    adFormCapacitySelect.options[3].setAttribute('disabled', true);
    adFormCapacitySelect.value = 3;
  } else if (value === '100') {
    adFormCapacitySelect.options[0].setAttribute('disabled', true);
    adFormCapacitySelect.options[1].setAttribute('disabled', true);
    adFormCapacitySelect.options[2].setAttribute('disabled', true);
    adFormCapacitySelect.options[3].removeAttribute('disabled');
    adFormCapacitySelect.value = 0;
  }
};

// Кастомная валидация полей формы

var adFormTitleInputValidityCheck = function () {
  if (adFormTitleInput.validity.valueMissing) {
    adFormTitleInput.setCustomValidity('Введите заголовок объявления');
  } else if (adFormTitleInput.validity.tooShort) {
    adFormTitleInput.setCustomValidity('Заголовок объявления должен содержать не менее 30 символов');
  } else if (adFormTitleInput.validity.tooLong) {
    adFormTitleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
  } else {
    adFormTitleInput.setCustomValidity('');
  }
};

var adFormPriceInputValidityCheck = function () {
  if (adFormPriceInput.validity.valueMissing) {
    adFormPriceInput.setCustomValidity('Введите цену за ночь');
  } else if (adFormPriceInput.validity.rangeUnderflow) {
    adFormPriceInput.setCustomValidity('Цена не может быть меньше ' + adFormPriceInput.min + ' руб.');
  } else if (adFormPriceInput.validity.rangeOverflow) {
    adFormPriceInput.setCustomValidity('Цена не должна превышать 1000000 руб.');
  } else {
    adFormPriceInput.setCustomValidity('');
  }
};

// Перемещение маркера

var coordinates = {
  x: null,
  y: null
};

var mouseMoveHandler = function (evt) {
  evt.preventDefault();

  if (!isPageActive) {
    activatePage();
  }

  isPageActive = true;

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

  setAdFormAddress(getMapPinMainCoordinates());

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

// Инициализация страницы

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  activateForm(adFormFields);
  activateForm(filtersFormFields);
  renderPins(createOffers(OFFER_QUANTITY));

  mapPinMain.removeEventListener('click', activatePage);

  adFormTypeSelect.addEventListener('change', priceChangeHandler);
  adFormRoomNumberSelect.addEventListener('change', capacityChangeHandler);
  adFormTimeField.addEventListener('change', timeChangeHandler);
  adFormTitleInput.addEventListener('invalid', adFormTitleInputValidityCheck);
  adFormPriceInput.addEventListener('invalid', adFormPriceInputValidityCheck);
};

var resetState = function () {
  deactivateForm(adFormFields);
  deactivateForm(filtersFormFields);
  isPageActive = false;

  adFormTypeSelect.removeEventListener('change', priceChangeHandler);
  adFormRoomNumberSelect.removeEventListener('change', capacityChangeHandler);
  adFormTimeField.removeEventListener('change', timeChangeHandler);
  adFormTitleInput.removeEventListener('invalid', adFormTitleInputValidityCheck);
  adFormPriceInput.removeEventListener('invalid', adFormPriceInputValidityCheck);

  mapPinMain.addEventListener('mousedown', mapPinMainMoveHandler);
  mapPinMain.addEventListener('click', activatePage);
};

resetState();
