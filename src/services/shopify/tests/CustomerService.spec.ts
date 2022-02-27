import { getLastAccessToken, login } from '@/services/shopify/CustomerService';

import { getDummyUser } from './utils/getDummyUser';

jest.setTimeout(60000);

const namespace = 'Customer';
describe('Customer Service', () => {
  describe('basic functions', () => {
    let customer: Awaited<ReturnType<typeof getDummyUser>>['customer'];

    it('register', async () => {
      let customerUserErrors;
      ({ customer, customerUserErrors } = await getDummyUser(namespace));

      expect(customer?.id).toBeTruthy();
      expect(
        Array.isArray(customerUserErrors) && customerUserErrors.length === 0,
        JSON.stringify(customerUserErrors, null, 2)
      ).toBeTruthy();
    });

    it('register again', async () => {
      const { customer: customer2, customerUserErrors } = await getDummyUser(
        namespace,
        customer
      );

      expect(customer2?.id).toBeFalsy();
      expect(
        Array.isArray(customerUserErrors) &&
          customerUserErrors?.length > 0 &&
          customerUserErrors?.[0]?.code === 'TAKEN',
        JSON.stringify(customerUserErrors, null, 2)
      ).toBeTruthy();
    });

    let customerAccessToken: Awaited<
      ReturnType<typeof login>
    >['customerAccessToken'];
    it('login', async () => {
      if (!customer) throw new Error('customer is nullish');
      let customerUserErrors;
      ({ customerAccessToken, customerUserErrors } = await login({
        email: customer.email,
        password: customer.password,
      }));

      expect(typeof customerAccessToken?.accessToken).toBe('string');
      expect(
        Array.isArray(customerUserErrors) && customerUserErrors.length
      ).toBe(0);
    });

    it('retrieve access token', async () => {
      if (!customerAccessToken)
        throw new Error('Access token profile is nullish');

      // eslint-disable-next-line unused-imports/no-unused-vars
      const exampleCustomerAccessToken = {
        accessToken: '489ca700a713247e09623b74296ebe10',
        expiresAt: '2022-03-27T11:23:50Z',
      };

      expect(customerAccessToken.accessToken).toBe(await getLastAccessToken());
    });
  });
});
