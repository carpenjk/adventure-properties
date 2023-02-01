const { createClient } = require('contentful');

module.exports = createClient({
  space: process.env.CMS_API_SPACE,
  accessToken: process.env.CMS_API_ACCESS_TOKEN,
});
