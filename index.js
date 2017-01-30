var count = 0;

module.exports = function (url, callback) {
  var id = 'j' + count++;

  var script = document.createElement('script');
  script.src = url + (url.includes('?') ? '&' : '?') + 'callback=' + id;

  script.onerror = function () {
    cleanup();
    callback(new Error());
  };

  window[id] = function (response) {
    cleanup();
    callback(null, response);
  };

  function cleanup() {
    document.head.removeChild(script);
    delete window[id];
  }

  document.head.appendChild(script);
};
