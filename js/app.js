'use strict';

(function () {

  var isPageActive = false;

  var filtersForm = document.querySelector('.map__filters');
  var filtersFormFields = filtersForm.querySelectorAll('select, fieldset');

  var pins = [];

  // Инициализация страницы

  var successHandler = function (data) {
    pins = data;
    updatePins();
  };

  var updatePins = function () {
    var updatedPins = pins
      .filter(window.filters.filterTypes)
      .slice(0, 5);

    window.cityMap.removePins();
    window.cityMap.renderPins(updatedPins);
  };

  var activatePage = function () {
    window.cityMap.mapMain.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');

    window.form.activateForm(window.form.adFormFields);
    window.form.activateForm(filtersFormFields);

    window.backend.load(successHandler, window.backend.showError);

    window.cityMap.mapPinMain.removeEventListener('click', activatePage);

    window.form.addFormEventListeners();
    filtersForm.addEventListener('change', updatePins);
  };

  var resetState = function () {
    window.form.deactivateForm(window.form.adFormFields);
    window.form.deactivateForm(filtersFormFields);
    window.cityMap.removePins();
    isPageActive = false;

    window.form.removeFormEventListeners();

    window.cityMap.mapPinMain.addEventListener('mousedown', window.cityMap.mapPinMainMoveHandler);
    window.cityMap.mapPinMain.addEventListener('click', activatePage);
  };

  window.app = {
    isPageActive: isPageActive,
    activatePage: activatePage,
  };

  resetState();

})();
