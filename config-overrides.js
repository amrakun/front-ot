const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#f47721",
      "@success-color": "#0099A8",
      "@error-color": "#f15a24",
      "@highlight-color": "#f15a24",
      "@font-size-base": "12px",
      "@font-size-lg": "14px",
      "@font-size-sm": "11px",
      "@heading-color": "fade(#000, 100%)",
      "@text-color": "fade(#000, 90%)",
      "@text-color-secondary": "fade(#000, 75%)"
    },
  })(config, env);
  return config;
};
