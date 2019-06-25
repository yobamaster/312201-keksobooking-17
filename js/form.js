'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.querySelectorAll('fieldset');
  var adFormTitleInput = adForm.querySelector('#title');
  var adFormAddressInput = adForm.querySelector('#address');
  var adFormPriceInput = adForm.querySelector('#price');
  var adFormTypeSelect = adForm.querySelector('#type');
  var adFormCapacitySelect = adForm.querySelector('#capacity');
  var adFormRoomNumberSelect = adForm.querySelector('#room_number');
  var adFormTimeField = adForm.querySelector('.ad-form__element--time');
  var adFormCheckInTimeSelect = adForm.querySelector('#timein');
  var adFormCheckOutTimeSelect = adForm.querySelector('#timeout');

  // Обработка формы

  var deactivateForm = function (formFields) {
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].setAttribute('disabled', '');
    }
  };

  var activateForm = function (formFields) {
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].removeAttribute('disabled');
    }
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

    switch (value) {
      case '1':
        adFormCapacitySelect.options[0].setAttribute('disabled', true);
        adFormCapacitySelect.options[1].setAttribute('disabled', true);
        adFormCapacitySelect.options[2].removeAttribute('disabled');
        adFormCapacitySelect.options[3].setAttribute('disabled', true);
        adFormCapacitySelect.value = 1;
        break;
      case '2':
        adFormCapacitySelect.options[0].setAttribute('disabled', true);
        adFormCapacitySelect.options[1].removeAttribute('disabled');
        adFormCapacitySelect.options[2].removeAttribute('disabled');
        adFormCapacitySelect.options[3].setAttribute('disabled', true);
        adFormCapacitySelect.value = 2;
        break;
      case '3':
        adFormCapacitySelect.options[0].setAttribute('disabled', true);
        adFormCapacitySelect.options[1].removeAttribute('disabled');
        adFormCapacitySelect.options[2].removeAttribute('disabled');
        adFormCapacitySelect.options[3].setAttribute('disabled', true);
        adFormCapacitySelect.value = 2;
        break;
      case '100':
        adFormCapacitySelect.options[0].setAttribute('disabled', true);
        adFormCapacitySelect.options[1].setAttribute('disabled', true);
        adFormCapacitySelect.options[2].setAttribute('disabled', true);
        adFormCapacitySelect.options[3].removeAttribute('disabled');
        adFormCapacitySelect.value = 0;
        break;
    }
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

  window.form = {
    adForm: adForm,
    adFormFields: adFormFields,
    adFormTitleInput: adFormTitleInput,
    adFormAddressInput: adFormAddressInput,
    adFormPriceInput: adFormPriceInput,
    adFormTypeSelect: adFormTypeSelect,
    adFormCapacitySelect: adFormCapacitySelect,
    adFormRoomNumberSelect: adFormRoomNumberSelect,
    adFormTimeField: adFormTimeField,
    adFormCheckInTimeSelect: adFormCheckInTimeSelect,
    adFormCheckOutTimeSelect: adFormCheckOutTimeSelect,
    deactivateForm: deactivateForm,
    activateForm: activateForm,
    setAdFormAddress: setAdFormAddress,
    priceChangeHandler: priceChangeHandler,
    timeChangeHandler: timeChangeHandler,
    capacityChangeHandler: capacityChangeHandler,
    adFormTitleInputValidityCheck: adFormTitleInputValidityCheck,
    adFormPriceInputValidityCheck: adFormPriceInputValidityCheck
  };

})();
