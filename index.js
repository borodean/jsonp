var count = 0;

module.exports = function (object, key, url, callback) {
  if (arguments.length < 4) {
    callback = key;
    key = 'j' + count++;
    url = object + (~object.indexOf('?') ? '&' : '?') + 'callback=' + key; // eslint-disable-line no-implicit-coercion
    object = window;
  }

  var script = document.createElement('script');
  script.src = url;

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
