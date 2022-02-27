import { v4 as uuid } from 'uuid';

import { createCart } from '@/services/shopify/CartService';
import { getLastAccessToken, login } from '@/services/shopify/CustomerService';
import { getDummyUser } from '@/services/shopify/tests/utils/getDummyUser';
import {
  CustomerSearchQuery,
  ShopifyAdminService,
} from '@/services/shopify-admin/ShopifyAdminService';

jest.setTimeout(60000);

const namespace = 'Customer';

describe('Customer Service', () => {
  it('login, create cart and save the cart id to metafields', async () => {
    //#region  //*=========== Register Successfully ===========
    const { customer, customerUserErrors } = await getDummyUser(namespace);

    expect(customer?.id).toBeTruthy();
    expect(Array.isArray(customerUserErrors) && customerUserErrors.length).toBe(
      0
    );
    //#endregion  //*======== Register Successfully ===========

    //#region  //*=========== Login Successfully and Store Access Token ===========
    const { customerAccessToken, customerUserErrors: customerLoginErrors } =
      await login({
        email: customer.email,
        password: customer.password,
      });

    expect(typeof customerAccessToken?.accessToken).toBe('string');
    expect(
      Array.isArray(customerLoginErrors) && customerLoginErrors.length === 0
    ).toBeTruthy();

    if (!customerAccessToken)
      throw new Error('Access token profile is nullish');

    const _exampleCustomerAccessToken = {
      accessToken: '489ca700a713247e09623b74296ebe10',
      expiresAt: '2022-03-27T11:23:50Z',
    };

    expect(customerAccessToken.accessToken).toBe(await getLastAccessToken());

    //#endregion  //*======== Login Successfully and Store Access Token ===========

    //#region  //*=========== Create Cart Successfully & Save to Customer Metafields ===========
    const { cart } = await createCart({
      accessToken: customerAccessToken.accessToken,
    });

    // https://shopify.dev/apps/metafields/types
    const { customerUpdate } = await ShopifyAdminService.customerUpdate({
      input: {
        id: customer.id,
        metafields: [
          {
            key: 'last_cart_id',
            namespace: 'cart',
            type: 'single_line_text_field',
            value: cart?.id,
          },
        ],
      },
    });

    expect(
      customerUpdate?.userErrors.length,
      JSON.stringify(customerUpdate?.userErrors, null, 2)
    ).toBe(0);

    //#endregion  //*======== Create Cart Successfully & Save to Customer Metafields ===========

    //#region  //*=========== Verify the Value is Saved in Customer's Metafields ===========
    const { customer: customer2 } = await ShopifyAdminService.customerGet({
      id: customer.id || '',
    });

    expect(
      customer2?.metafields.edges &&
        Array.isArray(customer2?.metafields.edges) &&
        (customer2?.metafields.edges).length > 0 &&
        customer2?.metafields.edges.find(
          ({ node }) => node.key === 'last_cart_id'
        )?.node.value
    ).toBe(cart?.id);

    //#endregion  //*======== Verify the Value is Saved in Customer's Metafields ===========
  });

  it('create customers for newsletter subscription', async () => {
    const email = `test-${uuid()}@gmail.com`;

    //#region  //*=========== Create a user with acceptsMarketing to be true ===========
    const { customerCreate } = await ShopifyAdminService.customerCreate({
      input: {
        email: email,
        acceptsMarketing: true,
      },
    });

    if (!customerCreate) throw new Error('customerCreate returns nullish');

    expect(
      Array.isArray(customerCreate.userErrors) &&
        customerCreate.userErrors.length
    ).toBe(0);

    //#endregion  //*======== Create a user with acceptsMarketing to be true ===========

    //#region  //*=========== Search this user and get his info ===========

    let customers: CustomerSearchQuery['customers']['edges'] = [];

    while (customers.length === 0)
      customers = (
        await ShopifyAdminService.customerSearch({
          query: `email:${email}`,
        })
      ).customers.edges;

    const customer = customers[0].node;

    //#endregion  //*======== Search this user and get his info ===========

    expect(customer.email).toBe(email);
    expect(customer.acceptsMarketing).toBe(true);
  });
});
