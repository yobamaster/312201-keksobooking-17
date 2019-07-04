'use strict';

(function () {

  var BASE_URL = 'https://js.dump.academy/keksobooking';
  var POST_URL = BASE_URL;
  var GET_URL = BASE_URL + '/data';
  var TIMEOUT = 3000;

  var xhrRequestHandler = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = xhrRequestHandler(onLoad, onError);

    xhr.open('GET', GET_URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = xhrRequestHandler(onLoad, onError);

    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
