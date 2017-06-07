/* eslint-disable handle-callback-err */

var sinon = require('sinon');
var test = require('blue-tape');
var jsonp = require('../promise');

var opts = {timeout: 5000};

test('setup', function (t) {
  sinon.spy(document.head, 'appendChild');
  t.end();
});

test('injects a script', opts, function (t) {
  var promise = jsonp('https://jsfiddle.net/echo/jsonp');
  t.equal(document.head.appendChild.lastCall.args[0].src, 'https://jsfiddle.net/echo/jsonp?callback=j0');
  return promise;
});

test('respects query parameters', opts, function (t) {
  var promise = jsonp('https://jsfiddle.net/echo/jsonp?foo=bar');
  t.equal(document.head.appendChild.lastCall.args[0].src, 'https://jsfiddle.net/echo/jsonp?foo=bar&callback=j1');
  return promise;
});

test('handles simultaneous requests', opts, function (t) {
  return Promise.all([
    jsonp('https://jsfiddle.net/echo/jsonp?foo=bar&delay=1'),
    jsonp('https://jsfiddle.net/echo/jsonp?baz=qux')
  ]).then(function (data) {
    t.deepEqual(data[0], {foo: 'bar'});
    t.deepEqual(data[1], {baz: 'qux'});
  });
});

test('retrieves data and cleans up', opts, function (t) {
  var promise = jsonp('https://jsfiddle.net/echo/jsonp?foo=bar');
  promise.then(function (data) {
    t.deepEqual(data, {foo: 'bar'});
    t.notOk(Object.keys(window).some(RegExp.prototype.test.bind(/^j\d+/)));
    t.equal(document.querySelectorAll('script[src*="jsfiddle.net"]').length, 0);
  });
  return promise;
});

test('fails and cleans up', opts, function (t) {
  var promise = jsonp('https://httpbin.org/status/400');
  promise.catch(function (err) {
    t.notOk(Object.keys(window).some(RegExp.prototype.test.bind(/^j\d+/)));
    t.equal(document.querySelectorAll('script[src*="jsfiddle.net"]').length, 0);
  });
  return t.shouldFail(promise, Error);
});

test('sets a custom callback query parameter', opts, function (t) {
  var promise = jsonp('https://www.reddit.com/api/info.json', {parameter: 'jsonp'});
  t.equal(document.head.appendChild.lastCall.args[0].src, 'https://www.reddit.com/api/info.json?jsonp=j6');
  return promise;
});

test('disables the callback query parameter', opts, function (t) {
  var promise = jsonp('https://httpbin.org/status/400', {parameter: ''});
  t.equal(document.head.appendChild.lastCall.args[0].src, 'https://httpbin.org/status/400');
  return t.shouldFail(promise);
});

test('sets a custom callback name', opts, function (t) {
  var promise = jsonp('https://jsfiddle.net/echo/jsonp', {key: 'foo'});
  t.equal(typeof window.foo, 'function');
  t.equal(document.head.appendChild.lastCall.args[0].src, 'https://jsfiddle.net/echo/jsonp?callback=foo');
  return promise;
});

test('sets a custom callback object', opts, function (t) {
  window.foo = {};
  var promise = jsonp('https://jsfiddle.net/echo/jsonp?callback=foo.bar', {object: window.foo, key: 'bar', parameter: ''});
  t.equal(typeof window.foo.bar, 'function');
  return promise.then(function () {
    delete window.foo;
  });
});

test('teardown', function (t) {
  document.head.appendChild.restore();
  t.end();
});
