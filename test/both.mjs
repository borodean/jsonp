/* eslint-disable handle-callback-err */
/* eslint-disable promise/prefer-await-to-then */

import { expect } from '@esm-bundle/chai';
import { after } from 'lodash-es';
import { spy } from 'sinon';

import callback from '../callback';
import promise from '../promise';

describe('jsonp', function () {
  this.timeout(20000);

  beforeEach(function () {
    spy(document.head, 'appendChild');
  });

  afterEach(function () {
    document.head.appendChild.restore();
  });

  it('handles simultaneous requests from different versions', function (done) {
    done = after(2, done);

    callback('https://jsfiddle.net/echo/jsonp?foo=bar&delay=1', function (err, data) {
      expect(data).to.deep.equal({foo: 'bar'});
      done();
    });

    promise('https://jsfiddle.net/echo/jsonp?baz=qux').then(function (data) {
      expect(data).to.deep.equal({baz: 'qux'});
      done();
    });
  });
});
