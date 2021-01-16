const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  /* config options here */
  env: {
    PROPERTIES_API_SPACE: process.env.PROPERTIES_API_SPACE,
    PROPERTIES_API_ACCESS_TOKEN: process.env.PROPERTIES_API_ACCESS_TOKEN,
  },
});
