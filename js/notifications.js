'use strict';

(function () {

  var successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var showFormSuccess = function () {
    var successPopup = successPopupTemplate.cloneNode(true);
    main.appendChild(successPopup);

    successPopup.addEventListener('click', clickPopupCloseHandler);
    document.addEventListener('keydown', escPressPopupCloseHandler);
  };

  var showFormError = function () {
    var errorPopup = errorPopupTemplate.cloneNode(true);
    main.appendChild(errorPopup);

    var errorButton = errorPopup.querySelector('.error__button');

    errorPopup.addEventListener('click', clickPopupCloseHandler);
    document.addEventListener('keydown', escPressPopupCloseHandler);
    errorButton.addEventListener('click', clickPopupCloseHandler);
    errorButton.addEventListener('keydown', enterPressErrorButtonHandler);
  };

  var showLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error__message--load');

    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
  };

  var closeForm = function () {
    var popups = main.querySelectorAll('.error, .success');
    var errorButton = document.querySelector('.error__button');

    if (errorButton) {
      errorButton.removeEventListener('keydown', enterPressErrorButtonHandler);
    }

    popups.forEach(function (popup) {
      popup.removeEventListener('click', clickPopupCloseHandler);
      document.removeEventListener('keydown', escPressPopupCloseHandler);
      popup.remove();
    });
  };


  var clickPopupCloseHandler = function () {
    closeForm();
  };

  var escPressPopupCloseHandler = function (evt) {
    if (evt.keyCode === 27) {
      closeForm();
    }
  };

  var enterPressErrorButtonHandler = function (evt) {
    if (evt.keyCode === 13) {
      closeForm();
    }
  };

  var removeLoadError = function () {
    var error = document.querySelector('.error__message--load');
    if (error) {
      error.remove();
    }
  };

  window.notifications = {
    showFormSuccess: showFormSuccess,
    showFormError: showFormError,
    showLoadError: showLoadError,
    removeLoadError: removeLoadError
  };

})();
