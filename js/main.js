'use strict';

var MAP_WIDTH = 1200;
var MAP_Y_MIN = 130;
var MAP_Y_MAX = 630;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TITLES = ['Объявление 1', 'Объявление 2', 'Объявление 3', 'Объявление 4', 'Объявление 5', 'Объявление 6', 'Объявление 7', 'Объявление 8'];
var OFFER_QUANTITY = 8;

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

var getAvatar = function (number) {
  return 'img/avatars/user0' + number + '.png';
};

var getRandomPosition = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var createOffer = function (number) {
  return {
    'author': {
      'avatar': getAvatar(number),
    },

    'offer': {
      'type': getRandomElement(OFFER_TYPES),
      'title': getRandomElement(OFFER_TITLES)
    },

    'location': {
      'x': getRandomPosition(0, MAP_WIDTH),
      'y': getRandomPosition(MAP_Y_MIN, MAP_Y_MAX),
    }
  };
};

var createOffers = function (number) {
  var offers = [];

  for (var i = 1; i <= number; i++) {
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

map.classList.remove('map--faded');
renderPins(createOffers(OFFER_QUANTITY));