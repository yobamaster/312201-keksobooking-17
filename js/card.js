'use strict';

(function () {
  var housingTypesMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  // Рендер карточек
  var mapMain = document.querySelector('.map');
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var filtersContainer = mapMain.querySelector('.map__filters-container');

  var getOfferFeatures = function (card, data) {
    var features = card.querySelector('.popup__features');

    while (features.firstChild) {
      features.removeChild(features.firstChild);
    }

    data.forEach(function (element) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + element);
      features.appendChild(feature);
    });
  };

  var getOfferPhotos = function (card, data) {
    var photos = card.querySelector('.popup__photos');

    data.forEach(function (element) {
      var photo = card.querySelector('.popup__photo').cloneNode(true);

      photo.src = element;
      photos.appendChild(photo);
    });

    photos.removeChild(photos.children[0]);
  };

  var renderCard = function (data) {
    var card = mapCardTemplate.cloneNode(true);
    card.querySelector('.popup__avatar').src = data.author.avatar;
    card.querySelector('.popup__title').textContent = data.offer.title;
    card.querySelector('.popup__text--address').textContent = data.offer.address;
    card.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = housingTypesMap[data.offer.type];
    card.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнат для ' + data.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    card.querySelector('.popup__description').textContent = data.offer.description;

    getOfferFeatures(card, data.offer.features);
    getOfferPhotos(card, data.offer.photos);

    card.querySelector('.popup__close').addEventListener('click', closeCardPopup);

    return card;
  };

  var cardEscapePressHandler = function (evt) {
    if (evt.keyCode === 27) {
      closeCardPopup();
    }
  };

  var closeCardPopup = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      document.removeEventListener('keydown', cardEscapePressHandler);
      card.querySelector('.popup__close').removeEventListener('click', closeCardPopup);
      card.remove();

      var activePin = mapMain.querySelector('.map__pin--active');
      activePin.classList.remove('map__pin--active');
    }
  };

  var showCardPopup = function (data) {
    closeCardPopup();
    mapMain.insertBefore(renderCard(data), filtersContainer);
    document.addEventListener('keydown', cardEscapePressHandler);
  };

  window.card = {
    showCardPopup: showCardPopup,
    closeCardPopup: closeCardPopup
  };
})();
