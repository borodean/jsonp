/* eslint-disable no-unused-expressions */
/* eslint-disable promise/prefer-await-to-then */

var _ = require('lodash');

var jsonp = require('../promise');

describe('jsonp/promise', function () {
  this.timeout(20000);

  beforeEach(function () {
    sinon.spy(document.head, 'appendChild');
  });

  afterEach(function () {
    document.head.appendChild.restore();
  });

  it('injects a script', function () {
    var promise = jsonp('https://jsfiddle.net/echo/jsonp');
    expect(document.head.appendChild.lastCall.args[0].src).to.equal('https://jsfiddle.net/echo/jsonp?callback=j0');
    return promise;
  });

  it('respects query parameters', function () {
    var promise = jsonp('https://jsfiddle.net/echo/jsonp?foo=bar');
    expect(document.head.appendChild.lastCall.args[0].src).to.equal('https://jsfiddle.net/echo/jsonp?foo=bar&callback=j1');
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
    expect(document.head.appendChild.lastCall.args[0].src).to.equal('https://www.reddit.com/api/info.json?jsonp=j6');
    return promise;
  });

  it('disables the callback query parameter', function () {
    var promise = jsonp('https://httpbin.org/status/400', {parameter: ''});
    expect(document.head.appendChild.lastCall.args[0].src).to.equal('https://httpbin.org/status/400');
    return promise.then(expect.fail, _.noop);
  });

  it('sets a custom callback name', function () {
    var promise = jsonp('https://jsfiddle.net/echo/jsonp', {key: 'foo'});
    expect(window.foo).to.be.a('function');
    expect(document.head.appendChild.lastCall.args[0].src).to.equal('https://jsfiddle.net/echo/jsonp?callback=foo');
    return promise;
  });

  it('sets a custom callback object', function () {
    window.foo = {};
    var promise = jsonp('https://jsfiddle.net/echo/jsonp?callback=foo.bar', {object: window.foo, key: 'bar', parameter: ''});
    expect(window.foo.bar).to.be.a('function');
    return promise.then(function () {
      delete window.foo;
    });
  });
});
