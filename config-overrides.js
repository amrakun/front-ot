const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#f47721",
      "@success-color": "#0099A8",
      "@error-color": "#f15a24",
      "@highlight-color": "#f15a24"
    },
  })(config, env);
  return config;
};
