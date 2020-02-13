/* eslint-disable import/no-unassigned-import */
/* eslint-disable no-unused-expressions */
/* eslint-disable promise/prefer-await-to-then */

require('core-js/features/promise');
var _ = require('lodash');

var jsonp = require('../promise');

describe('jsonp/promise', function () {
  this.timeout(20000);

  beforeEach(function () {
    sinon.spy(document.head, 'appendChild');
    window.foo = {};
  });

  afterEach(function () {
    document.head.appendChild.restore();
    delete window.foo;
  });

  it('injects a script', function () {
    var promise = jsonp('https://jsfiddle.net/echo/jsonp');
    expect(document.head.appendChild.lastCall.args[0].src).to.have.string('https://jsfiddle.net/echo/jsonp?callback=');
    return promise;
  });

  it('respects query parameters', function () {
    var promise = jsonp('https://jsfiddle.net/echo/jsonp?foo=bar');
    expect(document.head.appendChild.lastCall.args[0].src).to.have.string('https://jsfiddle.net/echo/jsonp?foo=bar&callback=');
    return promise;
  });

  it('handles simultaneous requests', function () {
    return Promise.all([
      jsonp('https://jsfiddle.net/echo/jsonp?foo=bar&delay=1'),
      jsonp('https://jsfiddle.net/echo/jsonp?baz=qux')
    ]).then(function (data) {
      expect(data[0]).to.deep.equal({foo: 'bar'});
      expect(data[1]).to.deep.equal({baz: 'qux'});
    });
  });

  it('retrieves data and cleans up', function () {
    var promise = jsonp('https://jsfiddle.net/echo/jsonp?foo=bar');
    return promise.then(function (data) {
      expect(data).to.deep.equal({foo: 'bar'});
      expect(Object.keys(window).some(RegExp.prototype.test.bind(/^j\d+/))).to.be.false;
      expect(document.querySelectorAll('script[src*="jsfiddle.net"]')).to.have.lengthOf(0);
    });
  });

  it('fails and cleans up', function () {
    var promise = jsonp('https://httpbin.org/status/400');
    return promise.then(expect.fail, function (err) {
      expect(err).to.be.an('error');
      expect(Object.keys(window).some(RegExp.prototype.test.bind(/^j\d+/))).to.be.false;
      expect(document.querySelectorAll('script[src*="jsfiddle.net"]')).to.have.lengthOf(0);
    });
  });

  it('sets a custom callback query parameter', function () {
    var promise = jsonp('https://www.reddit.com/api/info.json', {parameter: 'jsonp'});
    expect(document.head.appendChild.lastCall.args[0].src).to.have.string('https://www.reddit.com/api/info.json?jsonp=');
    return promise;
  });

  it('disables the callback query parameter', function () {
    var promise = jsonp('https://httpbin.org/status/400', {parameter: ''});
    expect(document.head.appendChild.lastCall.args[0].src).to.equal('https://httpbin.org/status/400');
    return promise.then(expect.fail, _.noop);
  });

  it('retrieves data via a custom callback name', function () {
    var promise = jsonp('https://jsfiddle.net/echo/jsonp?foo=bar', {key: 'foo'});
    return promise.then(function (data) {
      expect(data).to.deep.equal({foo: 'bar'});
      expect(document.head.appendChild.lastCall.args[0].src).to.equal('https://jsfiddle.net/echo/jsonp?foo=bar&callback=foo');
    });
  });

  it('retrieves data via a custom callback object', function () {
    var promise = jsonp('https://jsfiddle.net/echo/jsonp?foo=bar&callback=foo.bar', {object: window.foo, key: 'bar', parameter: ''});
    return promise.then(function (data) {
      expect(data).to.deep.equal({foo: 'bar'});
    });
  });
});
