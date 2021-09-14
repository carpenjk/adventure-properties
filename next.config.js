// const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withImages({
  /* config options here */
  env: {
    PROPERTIES_API_SPACE: process.env.PROPERTIES_API_SPACE,
    PROPERTIES_API_ACCESS_TOKEN: process.env.PROPERTIES_API_ACCESS_TOKEN,
  },
});
