/* eslint-disable camelcase */

import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import {uglify} from 'rollup-plugin-uglify';

export default [{
  input: 'index.js',
  output: {
    file: 'dist/jsonp.min.js',
    format: 'iife',
    name: 'jsonp',
    sourcemap: true
  },
  plugins: [
    commonjs(),
    filesize(),
    uglify({
      compress: {
        collapse_vars: true,
        unsafe: true
      },
      mangle: true
    })
  ]
}, {
  input: 'promise.js',
  output: {
    file: 'dist/jsonp-promise.min.js',
    format: 'iife',
    name: 'jsonp',
    sourcemap: true
  },
  plugins: [
    commonjs(),
    filesize(),
    uglify({
      compress: {
        collapse_vars: true,
        unsafe: true
      },
      mangle: true
    })
  ]
}];
