module.exports = config => {
  const customLaunchers = {
    'SL Chrome 26': {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Linux',
      version: '26.0',
    },
    'SL Edge 13': {
      base: 'SauceLabs',
      browserName: 'MicrosoftEdge',
      platform: 'Windows 10',
      version: '13.10586',
    },
    'SL Firefox 4': {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'Linux',
      version: '4.0',
    },
    'SL Internet Explorer 9': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9.0',
    },
    'SL Safari 8': {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.10',
      version: '8.0',
    }
  };

  config.set({
    browserify: {
      debug: true
    },
    files: ['test.js'],
    frameworks: ['browserify', 'sinon', 'tape'],
    preprocessors: {
      'test.js': ['browserify']
    },
    reporters: ['dots']
  });

  if (!config.local) {
    config.set({
      browsers: Object.keys(customLaunchers),
      customLaunchers,
      reporters: [...config.reporters, 'saucelabs']
    });
  }
};
