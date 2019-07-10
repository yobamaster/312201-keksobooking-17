'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingTypeSelect = filtersForm.querySelector('#housing-type');

  var filterTypes = function (item) {
    if (housingTypeSelect.value === 'any') {
      return item.offer.type;
    }
    return item.offer.type === housingTypeSelect.value;
  };

  window.filters = {
    filterTypes: filterTypes
  };

})();
