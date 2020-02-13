var count = 0;

module.exports = function (url, options) {
  options = options || {};

  var object = options.object || window;
  var key = options.key || 'b' + count++;
  var parameter = 'parameter' in options ? options.parameter : 'callback';

  var script = document.createElement('script');
  script.src = parameter ? (url + (~url.indexOf('?') ? '&' : '?') + parameter + '=' + key) : url; // eslint-disable-line no-implicit-coercion

  return new Promise(function (resolve, reject) {
    script.onerror = function () { // eslint-disable-line unicorn/prefer-add-event-listener
      delete object[key];
      reject(new Error());
    };

    object[key] = function (response) {
      delete object[key];
      resolve(response);
    };

    document.head.removeChild(document.head.appendChild(script)); // eslint-disable-line unicorn/prefer-node-append
  });
};
