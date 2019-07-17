'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingTypeSelect = filtersForm.querySelector('#housing-type');
  var housingPriceSelect = filtersForm.querySelector('#housing-price');
  var housingRoomsSelect = filtersForm.querySelector('#housing-rooms');
  var housingGuestsSelect = filtersForm.querySelector('#housing-guests');

  var housingPriceMap = {
    'low': function (element) {
      return element.offer.price < 10000;
    },
    'middle': function (element) {
      return element.offer.price >= 10000 && element.offer.price <= 50000;
    },
    'high': function (element) {
      return element.offer.price > 50000;
    }
  };

  var filterTypes = function (item) {
    return housingTypeSelect.value === 'any'
      ? item.offer.type
      : item.offer.type === housingTypeSelect.value;
  };

  var filterPrice = function (item) {
    return housingPriceSelect.value === 'any'
      ? item.offer.price
      : housingPriceMap[housingPriceSelect.value](item);
  };

  var filterRooms = function (item) {
    return housingRoomsSelect.value === 'any'
      ? item.offer.rooms
      : item.offer.rooms === parseInt(housingRoomsSelect.value, 10);
  };

  var filterGuests = function (item) {
    return housingGuestsSelect.value === 'any'
      ? item.offer.guests
      : item.offer.guests === parseInt(housingGuestsSelect.value, 10);
  };

  var filterFeatures = function (item) {
    var checkedFeatures = Array.from(filtersForm.querySelectorAll('.map__checkbox:checked'));

    return checkedFeatures.every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  window.filters = {
    filterTypes: filterTypes,
    filtersForm: filtersForm,
    filterPrice: filterPrice,
    filterRooms: filterRooms,
    filterGuests: filterGuests,
    filterFeatures: filterFeatures
  };

})();
