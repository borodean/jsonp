module.exports = config => {
  const customLaunchers = {
    'SL Chrome 26': {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Linux',
      version: '26.0'
    },
    'SL Edge 13': {
      base: 'SauceLabs',
      browserName: 'MicrosoftEdge',
      platform: 'Windows 10',
      version: '13.10586'
    },
    'SL Firefox 4': {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'Linux',
      version: '4.0'
    },
    'SL Internet Explorer 9': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9.0'
    },
    'SL Safari 8': {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.10',
      version: '8.0'
    }
  };

  config.set({
    browserify: {
      debug: true,
      transform: ['browserify-istanbul']
    },
    coverageReporter: {
      reporters: [{type: 'lcov'}, {type: 'text'}]
    },
    files: ['test/*'],
    frameworks: ['browserify', 'chai', 'mocha', 'sinon'],
    preprocessors: {
      'test/*': ['browserify']
    },
    reporters: ['dots', 'coverage', 'coveralls'],
    singleRun: true
  });

  if (!config.local) {
    config.set({
      browsers: Object.keys(customLaunchers),
      concurrency: 1,
      customLaunchers,
      reporters: [...config.reporters, 'saucelabs']
    });
  }
};
