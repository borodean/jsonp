module.exports = config => {
  const customLaunchers = {
    'SL Chrome 26': {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '26'
    },
    'SL Edge 13': {
      base: 'SauceLabs',
      browserName: 'microsoftedge',
      version: '13'
    },
    'SL Firefox 4': {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '4'
    },
    'SL Internet Explorer 9': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '9'
    },
    'SL iOS 8.1': {
      base: 'SauceLabs',
      browserName: 'iphone',
      version: '8.1'
    },
    'SL Safari 6': {
      base: 'SauceLabs',
      browserName: 'safari',
      version: '6'
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
