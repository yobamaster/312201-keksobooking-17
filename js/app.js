'use strict';

(function () {

  var isPageActive = false;

  var filtersForm = document.querySelector('.map__filters');
  var filtersFormFields = filtersForm.querySelectorAll('select, fieldset');

  // Инициализация страницы

  var activatePage = function () {
    window.cityMap.mapMain.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');

    window.form.activateForm(window.form.adFormFields);
    window.form.activateForm(filtersFormFields);
    window.backend.load(window.cityMap.renderPins, window.backend.showError);

    window.cityMap.mapPinMain.removeEventListener('click', activatePage);

    window.form.addFormEventListeners();
  };

  var resetState = function () {
    window.form.deactivateForm(window.form.adFormFields);
    window.form.deactivateForm(filtersFormFields);
    isPageActive = false;

    window.form.removeFormEventListeners();

    window.cityMap.mapPinMain.addEventListener('mousedown', window.cityMap.mapPinMainMoveHandler);
    window.cityMap.mapPinMain.addEventListener('click', activatePage);
  };

  window.app = {
    isPageActive: isPageActive,
    activatePage: activatePage
  };

  resetState();

})();
