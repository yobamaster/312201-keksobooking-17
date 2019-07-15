'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.querySelectorAll('fieldset');
  var adFormTitleInput = adForm.querySelector('#title');
  var adFormAddressInput = adForm.querySelector('#address');
  var adFormPriceInput = adForm.querySelector('#price');
  var adFormTypeSelect = adForm.querySelector('#type');
  var adFormCapacitySelect = adForm.querySelector('#capacity');
  var adFormCapacitySelectOptions = adFormCapacitySelect.querySelectorAll('option');
  var adFormRoomNumberSelect = adForm.querySelector('#room_number');
  var adFormTimeField = adForm.querySelector('.ad-form__element--time');
  var adFormCheckInTimeSelect = adForm.querySelector('#timein');
  var adFormCheckOutTimeSelect = adForm.querySelector('#timeout');

  var capacityMap = {
    '1': [1],
    '2': [1, 2],
    '3': [1, 2, 3],
    '100': [0]
  };

  // Обработка формы

  var deactivateForm = function (formFields) {
    formFields.forEach(function (element) {
      element.setAttribute('disabled', true);
    });
  };

  var activateForm = function (formFields) {
    formFields.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  var setAdFormAddress = function (coordinates) {
    adFormAddressInput.value = coordinates.x + ', ' + coordinates.y;
  };

  var priceChangeHandler = function (evt) {
    var value = evt.target.value;

    if (value === 'bungalo') {
      adFormPriceInput.setAttribute('min', window.offers.OFFER_MIN_PRICE.bungalo);
      adFormPriceInput.setAttribute('placeholder', window.offers.OFFER_MIN_PRICE.bungalo);
    } else if (value === 'flat') {
      adFormPriceInput.setAttribute('min', window.offers.OFFER_MIN_PRICE.flat);
      adFormPriceInput.setAttribute('placeholder', window.offers.OFFER_MIN_PRICE.flat);
    } else if (value === 'house') {
      adFormPriceInput.setAttribute('min', window.offers.OFFER_MIN_PRICE.house);
      adFormPriceInput.setAttribute('placeholder', window.offers.OFFER_MIN_PRICE.house);
    } else if (value === 'palace') {
      adFormPriceInput.setAttribute('min', window.offers.OFFER_MIN_PRICE.palace);
      adFormPriceInput.setAttribute('placeholder', window.offers.OFFER_MIN_PRICE.palace);
    }
  };

  var timeChangeHandler = function (evt) {
    var target = evt.target;

    if (target === adFormCheckInTimeSelect) {
      adFormCheckOutTimeSelect.value = target.value;
    } else {
      adFormCheckInTimeSelect.value = target.value;
    }
  };

  var capacityChangeHandler = function (evt) {
    var value = evt.target.value;
    var availableOptions = capacityMap[value];

    adFormCapacitySelect.value = capacityMap[value][0];

    adFormCapacitySelectOptions.forEach(function (element) {
      var capacityValue = parseInt(element.value, 10);

      if (availableOptions.indexOf(capacityValue) < 0) {
        element.setAttribute('disabled', true);
      } else {
        element.removeAttribute('disabled');
      }
    });
  };

  // Кастомная валидация полей формы

  var adFormTitleInputValidityCheck = function () {
    if (adFormTitleInput.validity.valueMissing) {
      adFormTitleInput.setCustomValidity('Введите заголовок объявления');
    } else if (adFormTitleInput.validity.tooShort) {
      adFormTitleInput.setCustomValidity('Заголовок объявления должен содержать не менее 30 символов');
    } else if (adFormTitleInput.validity.tooLong) {
      adFormTitleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else {
      adFormTitleInput.setCustomValidity('');
    }
  };

  var adFormPriceInputValidityCheck = function () {
    if (adFormPriceInput.validity.valueMissing) {
      adFormPriceInput.setCustomValidity('Введите цену за ночь');
    } else if (adFormPriceInput.validity.rangeUnderflow) {
      adFormPriceInput.setCustomValidity('Цена не может быть меньше ' + adFormPriceInput.min + ' руб.');
    } else if (adFormPriceInput.validity.rangeOverflow) {
      adFormPriceInput.setCustomValidity('Цена не должна превышать 1000000 руб.');
    } else {
      adFormPriceInput.setCustomValidity('');
    }
  };

  var addFormEventListeners = function () {
    adFormTypeSelect.addEventListener('change', priceChangeHandler);
    adFormRoomNumberSelect.addEventListener('change', capacityChangeHandler);
    adFormTimeField.addEventListener('change', timeChangeHandler);
    adFormTitleInput.addEventListener('invalid', adFormTitleInputValidityCheck);
    adFormPriceInput.addEventListener('invalid', adFormPriceInputValidityCheck);
  };

  var removeFormEventListeners = function () {
    adFormTypeSelect.removeEventListener('change', priceChangeHandler);
    adFormRoomNumberSelect.removeEventListener('change', capacityChangeHandler);
    adFormTimeField.removeEventListener('change', timeChangeHandler);
    adFormTitleInput.removeEventListener('invalid', adFormTitleInputValidityCheck);
    adFormPriceInput.removeEventListener('invalid', adFormPriceInputValidityCheck);
  };

  window.form = {
    adForm: adForm,
    adFormFields: adFormFields,
    deactivateForm: deactivateForm,
    activateForm: activateForm,
    setAdFormAddress: setAdFormAddress,
    addFormEventListeners: addFormEventListeners,
    removeFormEventListeners: removeFormEventListeners
  };

})();
