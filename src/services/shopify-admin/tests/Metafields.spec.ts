import {
  MetafieldOwnerType,
  ShopifyAdminService,
} from '@/services/shopify-admin/ShopifyAdminService';

jest.setTimeout(60000);

describe('Metafields', () => {
  it('query', async () => {
    const { metafieldDefinitions } =
      await ShopifyAdminService.metafieldDefinitions({
        ownerType: MetafieldOwnerType.Product,
      });

    expect(Array.isArray(metafieldDefinitions.edges)).toBeTruthy();
  });
});
