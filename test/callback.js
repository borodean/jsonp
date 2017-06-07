/* eslint-disable handle-callback-err */

var sinon = require('sinon');
var test = require('blue-tape');
var jsonp = require('../index');

var opts = {timeout: 5000};

test('setup', function (t) {
  sinon.spy(document.head, 'appendChild');
  t.end();
});

test('injects a script', opts, function (t) {
  jsonp('https://jsfiddle.net/echo/jsonp', t.end);
  t.equal(document.head.appendChild.lastCall.args[0].src, 'https://jsfiddle.net/echo/jsonp?callback=j0');
});

test('respects query parameters', opts, function (t) {
  jsonp('https://jsfiddle.net/echo/jsonp?foo=bar', t.end);
  t.equal(document.head.appendChild.lastCall.args[0].src, 'https://jsfiddle.net/echo/jsonp?foo=bar&callback=j1');
});

test('handles simultaneous requests', opts, function (t) {
  t.plan(2);

  jsonp('https://jsfiddle.net/echo/jsonp?foo=bar&delay=1', function (err, data) {
    t.deepEqual(data, {foo: 'bar'});
  });

  jsonp('https://jsfiddle.net/echo/jsonp?baz=qux', function (err, data) {
    t.deepEqual(data, {baz: 'qux'});
  });
});

test('retrieves data and cleans up', opts, function (t) {
  jsonp('https://jsfiddle.net/echo/jsonp?foo=bar', function (err, data) {
    t.ifError(err);
    t.deepEqual(data, {foo: 'bar'});

    t.notOk(Object.keys(window).some(RegExp.prototype.test.bind(/^j\d+/)));
    t.equal(document.querySelectorAll('script[src*="jsfiddle.net"]').length, 0);
    t.end();
  });
});

test('fails and cleans up', opts, function (t) {
  jsonp('https://httpbin.org/status/400', function (err, data) {
    t.ok(err instanceof Error);
    t.equal(data, undefined);

    t.notOk(Object.keys(window).some(RegExp.prototype.test.bind(/^j\d+/)));
    t.equal(document.querySelectorAll('script[src*="jsfiddle.net"]').length, 0);
    t.end();
  });
});

test('sets a custom callback query parameter', opts, function (t) {
  jsonp('https://www.reddit.com/api/info.json', {parameter: 'jsonp'}, t.end);
  t.equal(document.head.appendChild.lastCall.args[0].src, 'https://www.reddit.com/api/info.json?jsonp=j6');
});

test('disables the callback query parameter', opts, function (t) {
  jsonp('https://httpbin.org/status/400', {parameter: ''}, t.end.bind(this, null));
  t.equal(document.head.appendChild.lastCall.args[0].src, 'https://httpbin.org/status/400');
});

test('sets a custom callback name', opts, function (t) {
  jsonp('https://jsfiddle.net/echo/jsonp', {key: 'foo'}, t.end);
  t.equal(typeof window.foo, 'function');
  t.equal(document.head.appendChild.lastCall.args[0].src, 'https://jsfiddle.net/echo/jsonp?callback=foo');
});

test('sets a custom callback object', opts, function (t) {
  window.foo = {};
  jsonp('https://jsfiddle.net/echo/jsonp?callback=foo.bar', {object: window.foo, key: 'bar', parameter: ''}, function () {
    delete window.foo;
    t.end();
  });
  t.equal(typeof window.foo.bar, 'function');
});

test('teardown', function (t) {
  document.head.appendChild.restore();
  t.end();
});
