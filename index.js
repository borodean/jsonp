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
    cleanup();
    callback(new Error());
  };

  object[key] = function (response) {
    cleanup();
    callback(null, response);
  };

  function cleanup() {
    document.head.removeChild(script);
    delete object[key];
  }

  document.head.appendChild(script);
};
