/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ENDPOINT;
const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const generated = path.join(__dirname, 'generated.ts');
const documents = path.join(__dirname, '../graphql/**/*.gql');

module.exports = {
  client: {
    service: {
      name: 'Shopify Storefront API',
      url: endpoint,
      headers: { 'X-Shopify-Storefront-Access-Token': accessToken },
    },
    excludes: [generated],
    includes: [documents],
  },
};
