import { v4 as uuid } from 'uuid';

import { register } from '@/services/shopify/CustomerService';

export const getDummyUser = async (
  namespace: string,
  _customer?: {
    email: string;
    password: string;
    id?: string | undefined;
  }
) => {
  const email = _customer?.email || `test-${uuid()}@gmail.com`;
  const password = _customer?.password || uuid();

  const { customer, customerUserErrors } = await register({
    email,
    password,
    firstName: `Test`,
    lastName: `Chan (${namespace})`,
  });

  return {
    customer: {
      ...customer,
      email,
      password,
    },
    customerUserErrors,
  };
};
