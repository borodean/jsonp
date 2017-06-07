/* eslint-disable camelcase */

module.exports = [{
  entry: 'index.js',
  dest: 'dist/jsonp.min.js',
  format: 'iife',
  moduleName: 'jsonp',
  plugins: [
    require('rollup-plugin-commonjs')(),
    require('rollup-plugin-filesize')(),
    require('rollup-plugin-uglify')({
      compress: {
        collapse_vars: true,
        unsafe: true
      },
      mangle: true
    })
  ],
  sourceMap: true
}, {
  entry: 'promise.js',
  dest: 'dist/jsonp-promise.min.js',
  format: 'iife',
  moduleName: 'jsonp',
  plugins: [
    require('rollup-plugin-commonjs')(),
    require('rollup-plugin-filesize')(),
    require('rollup-plugin-uglify')({
      compress: {
        collapse_vars: true,
        unsafe: true
      },
      mangle: true
    })
  ],
  sourceMap: true
}];
