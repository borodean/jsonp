[![Sauce test status][sauce-matrix]][sauce]

# jsonp(url[, options], callback)

- `url` &lt;String&gt; The URL to which the request is sent.
- `options` &lt;Object&gt;
  - `parameter` &lt;String&gt; The name of the JSONP query parameter. Defaults to `"callback"`.
  - `object` &lt;Object&gt; An object to which to attach the JSONP callback. Defaults to `window`.
  - `key` &lt;String&gt; The name of the JSONP callback. Defaults to an automatically generated unique value.
- `callback` &lt;Function(err, data)&gt; A callback function that receives the data.

Loads data from the server using [JSONP][jsonp]. Example:

```js
import jsonp from '@borodean/jsonp';

jsonp('https://jsfiddle.net/echo/jsonp?foo=bar', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

# Promise version

A version that returns a promise is also available:

```js
import jsonp from '@borodean/jsonp/promise';

jsonp('https://jsfiddle.net/echo/jsonp?foo=bar').then(
  data => console.log(data),
  err => console.log(err)
);
```

## Installation

```
npm install @borodean/jsonp
```

For a browser global version check the `dist` directory of the installed module or directly download it:

- [Production version][dl-callback] – 266 bytes, minified and gzipped
- [Source map][dl-callback-map]

Promise version:

- [Production version][dl-promise] – 277 bytes, minified and gzipped
- [Source map][dl-promise-map]

[dl-callback]: https://github.com/borodean/jsonp/releases/download/3.0.0/jsonp-3.0.0.min.js
[dl-callback-map]: https://github.com/borodean/jsonp/releases/download/3.0.0/jsonp-3.0.0.min.js.map
[dl-promise]: https://github.com/borodean/jsonp/releases/download/3.0.0/jsonp-promise-3.0.0.min.js
[dl-promise-map]: https://github.com/borodean/jsonp/releases/download/3.0.0/jsonp-promise-3.0.0.min.js.map
[jsonp]: http://bob.ippoli.to/archives/2005/12/05/remote-json-jsonp/
[sauce]: https://saucelabs.com/u/borodean-jsonp
[sauce-matrix]: https://saucelabs.com/browser-matrix/borodean-jsonp.svg
