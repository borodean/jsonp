/* eslint-disable camelcase */

import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import {uglify} from 'rollup-plugin-uglify';

import {version} from './package.json';

const name = 'jsonp';

const createInput = (input, outputBasename) => ({
  input,
  output: [
    createOutput(`dist/${outputBasename}.min.js`),
    createOutput(`dist/${outputBasename}-${version}.min.js`)
  ],
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
  createInput('callback.js', name),
  createInput('promise.js', `${name}-promise`)
];
