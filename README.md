[![Sauce test status][sauce-matrix]][sauce]

# jsonp(url, callback)

- `url` &lt;String&gt; The URL to which the request is sent.
- `callback` &lt;Function(err, data)&gt; A callback function that receives the data.

Loads data from the server using [JSONP][jsonp]. Example:

```js
jsonp('https://jsfiddle.net/echo/jsonp?foo=bar', function (err, data) {
  if (err) throw err;
  console.log(data);
});
```

When called this way, it creates an intermediate callback inside the `window` object and appends the passed URL with an additional `callback` query parameter containing its key.

If you want more control over this, use the following 4-arguments form.

## jsonp(object, key, url, callback)

- `object` &lt;Object&gt; An object which would hold the intermediate callback function
- `key` &lt;String&gt; The key of an object to which to assign the intermediate callback function
- `url` &lt;String&gt; The URL to which the request is sent.
- `callback` &lt;Function(err, data)&gt; An callback function that receives the data.

When called this way, it creates an intermediate callback inside the passed object under the passed key. The passed URL is kept intact.

## Installation

```
npm install @borodean/jsonp
```

For a browser global version check the `dist` directory of the installed module or directly download it:

- [Production version][dl] – 258 bytes, minified and gzipped
- [Source map][dl-map]

[dl]: https://github.com/borodean/jsonp/releases/download/1.1.0/jsonp-1.1.0.min.js
[dl-map]: https://github.com/borodean/jsonp/releases/download/1.1.0/jsonp-1.1.0.min.js.map
[jsonp]: http://bob.ippoli.to/archives/2005/12/05/remote-json-jsonp/
[sauce]: https://saucelabs.com/u/borodean-jsonp
[sauce-matrix]: https://saucelabs.com/browser-matrix/borodean-jsonp.svg
