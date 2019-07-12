'use strict';

(function () {

  var filtersForm = document.querySelector('.map__filters');
  var filtersFormFields = filtersForm.querySelectorAll('select, fieldset');
  var resetButton = document.querySelector('.ad-form__reset');

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

    window.card.closeCardPopup();
    window.cityMap.removePins();
    window.cityMap.renderPins(updatedPins);
  };

  var activatePage = function () {
    window.cityMap.mapMain.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');

    window.form.activateForm(window.form.adFormFields);
    window.form.activateForm(filtersFormFields);

    window.backend.load(successHandler, window.errors.addError);

    window.cityMap.mapPinMain.removeEventListener('click', activatePage);

    window.form.addFormEventListeners();
    filtersForm.addEventListener('change', updatePins);
    resetButton.addEventListener('click', resetState);
  };

  var resetState = function () {
    window.cityMap.mapMain.classList.add('map--faded');
    window.cityMap.removePins();
    window.cityMap.mapPinMainResetCoordinates(window.cityMap.mapPinMainInitialCoordinate);

    window.form.adForm.classList.add('ad-form--disabled');
    window.form.deactivateForm(window.form.adFormFields);
    window.form.deactivateForm(filtersFormFields);
    window.form.removeFormEventListeners();

    window.errors.removeError();

    window.cityMap.mapPinMain.addEventListener('mousedown', window.cityMap.mapPinMainMoveHandler);
    window.cityMap.mapPinMain.addEventListener('click', activatePage);
  };

  resetState();

})();
