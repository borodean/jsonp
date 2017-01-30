/* eslint-disable handle-callback-err */

var test = require('tape');
var jsonp = require('.');

test('injects a script', function (t) {
  jsonp('https://jsfiddle.net/echo/jsonp', t.end);
  t.ok(document.querySelector('script[src^="https://jsfiddle.net/echo/jsonp?callback=j"]'));
});

test('respects query parameters', function (t) {
  jsonp('https://jsfiddle.net/echo/jsonp?foo=bar', t.end);
  t.ok(document.querySelector('script[src^="https://jsfiddle.net/echo/jsonp?foo=bar&callback=j"]'));
});

test('handles simultaneous requests', function (t) {
  t.plan(2);

  jsonp('https://jsfiddle.net/echo/jsonp?foo=bar&delay=1', function (err, data) {
    t.deepEqual(data, {foo: 'bar'});
  });

  jsonp('https://jsfiddle.net/echo/jsonp?baz=qux', function (err, data) {
    t.deepEqual(data, {baz: 'qux'});
  });
});

test('retrieves data and cleans up', function (t) {
  jsonp('https://jsfiddle.net/echo/jsonp?foo=bar', function (err, data) {
    t.ifError(err);
    t.deepEqual(data, {foo: 'bar'});

    t.notOk(Object.keys(window).some(RegExp.prototype.test.bind(/^j\d+/)));
    t.equal(document.querySelectorAll('script[src*="callback"]').length, 0);
    t.end();
  });
});

test('fails and cleans up', function (t) {
  jsonp('https://httpbin.org/status/400', function (err, data) {
    t.ok(err instanceof Error);
    t.equal(data, undefined);

    t.notOk(Object.keys(window).some(RegExp.prototype.test.bind(/^j\d+/)));
    t.equal(document.querySelectorAll('script[src*="callback"]').length, 0);
    t.end();
  });
});
