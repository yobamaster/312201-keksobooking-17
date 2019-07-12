'use strict';

(function () {

  var addError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error__message--load');

    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
  };

  var removeError = function () {
    var error = document.querySelector('.error__message--load');
    if (error) {
      error.remove();
    }
  };

  window.errors = {
    addError: addError,
    removeError: removeError
  };

})();
