import { GraphQLClient } from 'graphql-request';

import { getSdk } from './generator/generated';

const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ENDPOINT || '';
const accessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

if (!endpoint || !accessToken)
  throw new Error('Shopify Storefront API credentials are empty');

export const client = new GraphQLClient(endpoint, {
  headers: { 'X-Shopify-Storefront-Access-Token': accessToken },
});

export const ShopifyService = getSdk(client);

export * from './generator/generated';
