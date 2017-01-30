/* eslint-disable camelcase */

module.exports = {
  entry: 'index.js',
  format: 'iife',
  moduleName: 'jsonp',
  plugins: [
    require('rollup-plugin-commonjs')(),
    require('rollup-plugin-filesize')(),
    require('rollup-plugin-uglify')({
      compress: {
        collapse_vars: true
      },
      mangle: true
    })
  ],
  sourceMap: true
};
