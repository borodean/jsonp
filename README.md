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
jsonp('https://jsfiddle.net/echo/jsonp?foo=bar', function (err, data) {
  if (err) throw err;
  console.log(data);
});
```

## Installation

```
npm install @borodean/jsonp
```

For a browser global version check the `dist` directory of the installed module or directly download it:

- [Production version][dl] – 271 bytes, minified and gzipped
- [Source map][dl-map]

[dl]: https://github.com/borodean/jsonp/releases/download/2.0.0/jsonp-2.0.0.min.js
[dl-map]: https://github.com/borodean/jsonp/releases/download/2.0.0/jsonp-2.0.0.min.js.map
[jsonp]: http://bob.ippoli.to/archives/2005/12/05/remote-json-jsonp/
[sauce]: https://saucelabs.com/u/borodean-jsonp
[sauce-matrix]: https://saucelabs.com/browser-matrix/borodean-jsonp.svg
