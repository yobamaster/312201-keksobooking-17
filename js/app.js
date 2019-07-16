'use strict';

(function () {

  var MAX_NUMBER_OF_PINS = 5;

  var filtersForm = document.querySelector('.map__filters');
  var filtersFormFields = filtersForm.querySelectorAll('select, fieldset');
  var resetButton = document.querySelector('.ad-form__reset');

  var pins = [];

  var filters = [
    window.filters.filterTypes,
    window.filters.filterPrice,
    window.filters.filterRooms,
    window.filters.filterGuests,
    window.filters.filterFeatures
  ];

  // Инициализация страницы

  var updatePins = window.utils.debounce(function () {
    var updatedPins = filters.reduce(function (data, currentFilter) {
      return data.filter(currentFilter);
    }, pins)
      .slice(0, MAX_NUMBER_OF_PINS);

    window.card.closeCardPopup();
    window.cityMap.removePins();
    window.cityMap.renderPins(updatedPins);
  });

  var loadSuccessHandler = function (data) {
    pins = data;
    updatePins();
  };

  var formSuccessHandler = function () {
    window.card.closeCardPopup();
    resetState();
    window.notifications.showFormSuccess();
  };

  var formErrorHandler = function () {
    window.card.closeCardPopup();
    window.notifications.showFormError();
  };

  window.form.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.form.adForm), formSuccessHandler, formErrorHandler);
  });

  var activatePage = function () {
    window.cityMap.mapMain.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');

    window.form.activateForm(window.form.adFormFields);
    window.form.activateForm(filtersFormFields);

    window.backend.load(loadSuccessHandler, window.notifications.showLoadError);

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
    window.form.adForm.reset();
    window.filters.filtersForm.reset();


    window.notifications.removeLoadError();

    window.cityMap.mapPinMain.addEventListener('mousedown', window.cityMap.mapPinMainMoveHandler);
    window.cityMap.mapPinMain.addEventListener('click', activatePage);
  };

  resetState();

})();
