/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const endpoint = process.env.SHOPIFY_ADMIN_API_ENDPOINT;
const accessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

const generated = path.join(__dirname, 'generated.ts');
const documents = path.join(__dirname, '../graphql/**/*.gql');

module.exports = {
  client: {
    service: {
      name: 'Shopify Admin API',
      url: endpoint,
      headers: { 'X-Shopify-Access-Token': accessToken },
    },
    excludes: [generated],
    includes: [documents],
  },
};
