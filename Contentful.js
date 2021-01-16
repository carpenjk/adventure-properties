import { createClient } from 'contentful';

export default createClient({
  space: process.env.PROPERTIES_API_SPACE,
  accessToken: process.env.PROPERTIES_API_ACCESS_TOKEN,
});
