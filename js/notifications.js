'use strict';

(function () {

  var successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var showFormSuccess = function () {
    var successPopup = successPopupTemplate.cloneNode(true);
    main.appendChild(successPopup);
  };

  var showFormError = function () {
    var errorPopup = errorPopupTemplate.cloneNode(true);
    main.appendChild(errorPopup);
  };

  var showLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error__message--load');

    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
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
