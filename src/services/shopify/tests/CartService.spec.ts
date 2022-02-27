import {
  addItem,
  Cart,
  createCart,
  getCart,
} from '@/services/shopify/CartService';
import { getProducts, Product } from '@/services/shopify/ProductService';

jest.setTimeout(60000);

describe('Cart Service', () => {
  describe('basic functions', () => {
    let cart: Cart | undefined;
    let products: Product[];
    it('create cart', async () => {
      ({ products } = await getProducts());

      expect(
        Array.isArray(products) && products.length > 0,
        'No products to be tested'
      ).toBeTruthy();
    });

    it('create cart', async () => {
      let errors: Awaited<ReturnType<typeof createCart>>['errors'];

      ({ cart, errors } = await createCart());
      expect(errors.length).toBe(0);
      expect(typeof cart?.id).toBe('string');
    });

    let variantId: string;

    it('add to cart', async () => {
      variantId = products[0].variants.edges?.[0].node.id;
      const { cart, userErrors } = await addItem({
        variantId,
        quantity: 1,
      });

      expect(Array.isArray(userErrors) && userErrors.length).toBe(0);
      expect(typeof cart?.id).toBe('string');
    });

    it('verify persistence of the cart', async () => {
      const { cart } = await getCart();

      if (!cart) throw new Error('getCart returns nullish');

      const productsInCart = cart?.lines.edges;

      expect(productsInCart.length).toBe(1);
      expect(productsInCart[0].node.merchandise.id).toBe(variantId);
      expect(productsInCart[0].node.quantity).toBe(1);

      const _exampleCart = {
        id: 'Z2lkOi8vc2hvcGlmeS9DYXJ0LzNjMDc5NmZiN2M3NWY1NTdhZjM2NzhjN2Q4ZThiYTNi',
        checkoutUrl:
          'https://ecchochan.myshopify.com/cart/c/3c0796fb7c75f557af3678c7d8e8ba3b',
        updatedAt: '2022-02-27T03:14:32Z',
        discountCodes: [],
        estimatedCost: {
          totalAmount: { currencyCode: 'HKD', amount: '16.0' },
        },
        lines: { edges: [[Object]] },
      };

      const _exampleLineNode = {
        id: 'Z2lkOi8vc2hvcGlmeS9DYXJ0TGluZS8xM2Y5ZTA1YjlkMjJiMjhiZmEzZDJmNzg0MDVmYWM4OD9jYXJ0PTNjMDc5NmZiN2M3NWY1NTdhZjM2NzhjN2Q4ZThiYTNi',
        quantity: 1,
        estimatedCost: {
          totalAmount: { currencyCode: 'HKD', amount: '16.0' },
        },
        merchandise: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTgzNjg3MjU3Mjk4OA==',
          priceV2: { amount: '16.0', currencyCode: 'HKD' },
          requiresShipping: true,
          title: 'Small',
          product: { handle: 'lily' },
          image: {
            transformedSrc:
              'https://cdn.shopify.com/s/files/1/0561/0209/2860/products/Ecomm_02_Lily_004_300x400_crop_center.jpg.webp?v=1644732744',
            altText: null,
            id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMjk1ODc1NzU2Njg3OTY=',
          },
          availableForSale: true,
          weight: 0,
          weightUnit: 'KILOGRAMS',
        },
        discountAllocations: [],
      };
    });
  });
});
