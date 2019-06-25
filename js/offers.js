'use strict';

(function () {

  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_TITLES = ['Объявление 1', 'Объявление 2', 'Объявление 3', 'Объявление 4', 'Объявление 5', 'Объявление 6', 'Объявление 7', 'Объявление 8'];
  var OFFER_QUANTITY = 8;
  var OFFER_MIN_PRICE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
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
        'type': window.utils.getRandomElement(OFFER_TYPES),
        'title': window.utils.getRandomElement(OFFER_TITLES)
      },

      'location': {
        'x': getRandomPosition(window.map.MAP_X_MIN, window.map.MAP_X_MAX),
        'y': getRandomPosition(window.map.MAP_Y_MIN, window.map.MAP_Y_MAX),
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

  window.offers = {
    OFFER_TYPES: OFFER_TYPES,
    OFFER_TITLES: OFFER_TITLES,
    OFFER_QUANTITY: OFFER_QUANTITY,
    OFFER_MIN_PRICE: OFFER_MIN_PRICE,
    createOffers: createOffers,
  };
})();
