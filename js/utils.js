'use strict';

(function () {

  var getRandomElement = function (elements) {
    return elements[Math.floor(Math.random() * elements.length)];
  };

  window.utils = {
    getRandomElement: getRandomElement
  };

})();
