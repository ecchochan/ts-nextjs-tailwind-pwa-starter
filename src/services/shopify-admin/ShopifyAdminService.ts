import { GraphQLClient } from 'graphql-request';

import { getSdk } from './generator/generated';

const endpoint = process.env.SHOPIFY_ADMIN_API_ENDPOINT || '';
const accessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '';

if (!endpoint || !accessToken)
  throw new Error('Shopify Admin API credentials are empty');

export const client = new GraphQLClient(endpoint, {
  headers: { 'X-Shopify-Access-Token': accessToken },
});

export const ShopifyAdminService = getSdk(client);

export * from './generator/generated';
