/** @type {import('@web/test-runner').TestRunnerConfig} */
export default {
  coverage: true,
  coverageConfig: {
    reporters: ['lcov', 'text'],
  },
  files: 'test/**/*.mjs',
  nodeResolve: true,
}
