'use strict';

(function () {

  var getRandomElement = function (elements) {
    return elements[Math.floor(Math.random() * elements.length)];
  };

  var addError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.utils = {
    getRandomElement: getRandomElement,
    addError: addError
  };

})();
