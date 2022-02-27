import { NextPageContext } from 'next';
import nookies from 'nookies';
import { SetRequired } from 'type-fest';
import create from 'zustand';

import { withLockStatus } from '@/lib/zustand-lock';

import { ShopifyService } from '@/services/shopify/ShopifyService';

import { getLastAccessToken, getProfile } from './CustomerService';
import { CartInput, CreateCartMutation } from './generator/generated';

export type Cart = NonNullable<
  NonNullable<CreateCartMutation['cartCreate']>['cart']
>;

interface CartState {
  status: 'idle' | 'fetching' | 'creating' | 'adding' | 'updating' | 'removing';
  cart: Cart | undefined;
}

const useCart = withLockStatus(
  create<CartState>(() => ({
    status: 'idle',
    cart: undefined,
  }))
);

export async function createCart(args: { accessToken?: string } = {}) {
  let { accessToken } = args;
  const input: CartInput = {};

  if (!accessToken) {
    accessToken = await getLastAccessToken();
  }

  if (accessToken)
    input.buyerIdentity = {
      customerAccessToken: accessToken,
    };

  const { cartCreate } = await useCart.lockStatus('creating', async () => {
    return await ShopifyService.createCart({
      input,
    });
  });

  const errors: Error[] = [];

  if (!cartCreate) errors.push(new Error('cartCreate is nullish'));

  const { cart, userErrors } = cartCreate || {};

  if (cart) useCart.setState({ cart });

  // we cannot directly save the cart id into shopify
  // because we can only update metafields using admin api

  return {
    cart: cart || undefined,
    errors: userErrors ? userErrors : errors,
  };
}

export async function getCart(context?: NextPageContext, force?: boolean) {
  let { cart, errors }: Awaited<ReturnType<typeof createCart>> = {
    cart: undefined,
    errors: [],
  };

  //#region  //*=========== Load from local state ===========
  let existing = useCart.getState().cart;
  //#endregion  //*======== Load from local state ===========

  if (force || !existing) {
    //#region  //*=========== Load from cookies ===========
    let cartId = nookies.get(context, 'CART_ID').CART_ID;
    //#endregion  //*======== Load from cookies ===========

    //#region  //*=========== Load from shopify metafields ===========
    existing = await useCart.lockStatus('fetching', async () => {
      if (!cartId) {
        const { profile } = await getProfile();
        cartId =
          profile?.metafields.edges?.find(
            ({ node }) => node.key === 'last_cart_id'
          )?.node.value || '';
      }
      if (cartId) {
        const { cart } = await ShopifyService.getCart({ cartId });

        if (!cart) throw new Error('getCart returns nullish');

        return cart || undefined;
      }
    });
    //#endregion  //*======== Load from shopify metafields ===========
  }

  if (existing)
    return {
      cart: existing || undefined,
      errors,
    };

  //#region  //*=========== No existing cart found, create one ===========
  ({ cart, errors } = await createCart());
  //#endregion  //*======== No existing cart found, create one ===========

  if (!cart) throw new Error('createCart returns nullish');

  nookies.set(context, 'CART_ID', cart?.id || '', {
    maxAge: 365 * 24 * 60 * 60,
  });

  return { cart, errors };
}

export async function addItem(args: {
  variantId: string;
  quantity: number;
  context?: NextPageContext;
}) {
  const { cartLinesAdd } = await useCart.lockStatus('adding', async () => {
    const { variantId, quantity, context } = args;
    const { cart } = await getCart(context);
    const cartId = cart?.id || '';
    return await ShopifyService.addCartItem({
      cartId,
      lines: {
        merchandiseId: variantId,
        quantity,
      },
    });
  });

  if (!cartLinesAdd) throw new Error('cartLinesAdd returns nullish');

  if (cartLinesAdd.cart) useCart.setState({ cart: cartLinesAdd?.cart });

  return cartLinesAdd;
}

export async function updateItem(args: {
  lineItem: SetRequired<
    Partial<
      NonNullable<
        Awaited<ReturnType<typeof createCart>>['cart']
      >['lines']['edges'][0]['node']
    >,
    'id'
  >;
  context?: NextPageContext;
}) {
  const { lineItem, context } = args;
  const { cart } = await getCart(context);
  const cartId = cart?.id || '';

  const { cartLinesUpdate } = await useCart.lockStatus('adding', async () => {
    return await ShopifyService.updateCartItem({ cartId, lines: [lineItem] });
  });

  if (!cartLinesUpdate) throw new Error('cartLinesUpdate returns nullish');

  return cartLinesUpdate;
}

export async function removeItem(args: {
  lineItemIds: string | string[];
  context?: NextPageContext;
}) {
  const { lineItemIds, context } = args;
  const { cart } = await getCart(context);
  const cartId = cart?.id || '';

  const { cartLinesRemove } = await useCart.lockStatus('adding', async () => {
    return await ShopifyService.removeCartItem({
      cartId,
      lineIds: lineItemIds,
    });
  });

  if (!cartLinesRemove) throw new Error('cartLinesRemove returns nullish');

  return cartLinesRemove;
}
