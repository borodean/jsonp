var count = 0;

module.exports = function (url, options, callback) {
  if (!callback) {
    callback = options;
    options = {};
  }

  var object = options.object || window;
  var key = options.key || 'j' + count++;
  var parameter = 'parameter' in options ? options.parameter : 'callback';

  var script = document.createElement('script');
  script.src = parameter ? (url + (~url.indexOf('?') ? '&' : '?') + parameter + '=' + key) : url; // eslint-disable-line no-implicit-coercion

  script.onerror = function () {
    delete object[key];
    callback(new Error());
  };

  object[key] = function (response) {
    delete object[key];
    callback(null, response);
  };

  document.head.removeChild(document.head.appendChild(script));
};
