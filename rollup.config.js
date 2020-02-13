/* eslint-disable camelcase */

import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import {uglify} from 'rollup-plugin-uglify';

const name = 'jsonp';

const createInput = (input, output) => ({
  input,
  output: createOutput(`dist/${output}`),
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
});

const createOutput = file => ({
  file,
  format: 'iife',
  name,
  sourcemap: true
});

export default [
  createInput('callback.js', `${name}.min.js`),
  createInput('promise.js', `${name}-promise.min.js`)
];
