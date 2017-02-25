/* eslint-disable handle-callback-err */

var test = require('tape');
var jsonp = require('..');

var opts = {timeout: 5000};

var callbacks = {};

window.fn = function (result) {
  callbacks[result.id](result);
};

test('injects a script', opts, function (t) {
  jsonp(callbacks, 'foo', 'https://jsfiddle.net/echo/jsonp?id=foo&callback=fn', t.end);
  t.ok(document.querySelector('script[src="https://jsfiddle.net/echo/jsonp?id=foo&callback=fn"]'));
});

test('retrieves data and cleans up', opts, function (t) {
  jsonp(callbacks, 'foo', 'https://jsfiddle.net/echo/jsonp?id=foo&callback=fn', function (err, data) {
    t.ifError(err);
    t.deepEqual(data, {id: 'foo'});

    t.notOk('foo' in callbacks);
    t.equal(document.querySelectorAll('script[src*="callback"]').length, 0);
    t.end();
  });
});

test('fails and cleans up', opts, function (t) {
  jsonp(callbacks, 'foo', 'https://httpbin.org/status/400', function (err, data) {
    t.ok(err instanceof Error);
    t.equal(data, undefined);

    t.notOk('foo' in callbacks);
    t.equal(document.querySelectorAll('script[src*="callback"]').length, 0);
    t.end();
  });
});
