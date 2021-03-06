/* eslint-disable handle-callback-err */
/* eslint-disable no-unused-expressions */

var _ = require('lodash');

var jsonp = require('../callback');

describe('jsonp/callback', function () {
  this.timeout(20000);

  beforeEach(function () {
    sinon.spy(document.head, 'appendChild');
    window.foo = {};
  });

  afterEach(function () {
    document.head.appendChild.restore();
    delete window.foo;
  });

  it('injects a script', function (done) {
    jsonp('https://jsfiddle.net/echo/jsonp', done);
    expect(document.head.appendChild.lastCall.args[0].src).to.have.string('https://jsfiddle.net/echo/jsonp?callback=');
  });

  it('respects query parameters', function (done) {
    jsonp('https://jsfiddle.net/echo/jsonp?foo=bar', done);
    expect(document.head.appendChild.lastCall.args[0].src).to.have.string('https://jsfiddle.net/echo/jsonp?foo=bar&callback=');
  });

  it('handles simultaneous requests', function (done) {
    done = _.after(2, done);

    jsonp('https://jsfiddle.net/echo/jsonp?foo=bar&delay=1', function (err, data) {
      expect(data).to.deep.equal({foo: 'bar'});
      done();
    });

    jsonp('https://jsfiddle.net/echo/jsonp?baz=qux', function (err, data) {
      expect(data).to.deep.equal({baz: 'qux'});
      done();
    });
  });

  it('retrieves data and cleans up', function (done) {
    jsonp('https://jsfiddle.net/echo/jsonp?foo=bar', function (err, data) {
      expect(err).to.be.null;
      expect(data).to.deep.equal({foo: 'bar'});

      expect(Object.keys(window).some(RegExp.prototype.test.bind(/^j\d+/))).to.be.false;

      setTimeout(function () {
        expect(document.querySelectorAll('script[src*="jsfiddle.net"]')).to.have.lengthOf(0);
        done();
      });
    });
  });

  it('fails and cleans up', function (done) {
    jsonp('https://httpbin.org/status/400', function (err, data) {
      expect(err).to.be.an('error');
      expect(data).to.be.undefined;

      expect(Object.keys(window).some(RegExp.prototype.test.bind(/^j\d+/))).to.be.false;

      setTimeout(function () {
        expect(document.querySelectorAll('script[src*="jsfiddle.net"]')).to.have.lengthOf(0);
        done();
      });
    });
  });

  it('sets a custom callback query parameter', function (done) {
    jsonp('https://www.reddit.com/api/info.json', {parameter: 'jsonp'}, done);
    expect(document.head.appendChild.lastCall.args[0].src).to.have.string('https://www.reddit.com/api/info.json?jsonp=');
  });

  it('disables the callback query parameter', function (done) {
    jsonp('https://httpbin.org/status/400', {parameter: ''}, done.bind(this, null));
    expect(document.head.appendChild.lastCall.args[0].src).to.equal('https://httpbin.org/status/400');
  });

  it('retrieves data via a custom callback name', function (done) {
    jsonp('https://jsfiddle.net/echo/jsonp?foo=bar', {key: 'foo'}, function (err, data) {
      expect(err).to.be.null;
      expect(data).to.deep.equal({foo: 'bar'});
      expect(document.head.appendChild.lastCall.args[0].src).to.equal('https://jsfiddle.net/echo/jsonp?foo=bar&callback=foo');
      done();
    });
  });

  it('retrieves data via a custom callback object', function (done) {
    jsonp('https://jsfiddle.net/echo/jsonp?foo=bar&callback=foo.bar', {object: window.foo, key: 'bar', parameter: ''}, function (err, data) {
      expect(err).to.be.null;
      expect(data).to.deep.equal({foo: 'bar'});
      done();
    });
  });
});
