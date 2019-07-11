'use strict';

(function () {

  var successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var showSuccess = function () {
    var successPopup = successPopupTemplate.cloneNode(true);
    main.appendChild(successPopup);
  };

  var showError = function () {
    var errorPopup = errorPopupTemplate.cloneNode(true);
    main.appendChild(errorPopup);
  };


  window.notifications = {
    showSuccess: showSuccess,
    showError: showError
  };

})();
