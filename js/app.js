'use strict';

(function () {

  var isPageActive = false;

  var filtersForm = document.querySelector('.map__filters');
  var filtersFormFields = filtersForm.querySelectorAll('select, fieldset');

  // Инициализация страницы

  var activatePage = function () {
    window.map.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');

    window.form.activateForm(window.form.adFormFields);
    window.form.activateForm(filtersFormFields);
    window.map.renderPins(window.offers.createOffers(window.offers.OFFER_QUANTITY));

    window.map.mapPinMain.removeEventListener('click', activatePage);

    window.form.adFormTypeSelect.addEventListener('change', window.form.priceChangeHandler);
    window.form.adFormRoomNumberSelect.addEventListener('change', window.form.capacityChangeHandler);
    window.form.adFormTimeField.addEventListener('change', window.form.timeChangeHandler);
    window.form.adFormTitleInput.addEventListener('invalid', window.form.adFormTitleInputValidityCheck);
    window.form.adFormPriceInput.addEventListener('invalid', window.form.adFormPriceInputValidityCheck);
  };

  var resetState = function () {
    window.form.deactivateForm(window.form.adFormFields);
    window.form.deactivateForm(filtersFormFields);
    isPageActive = false;

    window.form.adFormTypeSelect.removeEventListener('change', window.form.priceChangeHandler);
    window.form.adFormRoomNumberSelect.removeEventListener('change', window.form.capacityChangeHandler);
    window.form.adFormTimeField.removeEventListener('change', window.form.timeChangeHandler);
    window.form.adFormTitleInput.removeEventListener('invalid', window.form.adFormTitleInputValidityCheck);
    window.form.adFormPriceInput.removeEventListener('invalid', window.form.adFormPriceInputValidityCheck);

    window.map.mapPinMain.addEventListener('mousedown', window.map.mapPinMainMoveHandler);
    window.map.mapPinMain.addEventListener('click', activatePage);
  };

  window.app = {
    isPageActive: isPageActive,
    activatePage: activatePage
  };

  resetState();

})();
