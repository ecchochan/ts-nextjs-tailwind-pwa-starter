import create from 'zustand';

import {
  CustomerAccessTokenCreateMutationVariables,
  CustomerCreateMutationVariables,
  CustomerGetQuery,
  CustomerGetQueryVariables,
  CustomerUpdateInput,
  ShopifyService,
} from './ShopifyService';

export type Profile = NonNullable<CustomerGetQuery['customer']>;

export type Account = {
  accessToken: string;
  expiresAt: Date;
};

type CustomerState = {
  profile: Profile | undefined;
  account: Account | undefined;
};

const useCustomer = create<CustomerState>(() => ({
  profile: undefined,
  account: undefined,
  //setCart: (cart) => set(state=>({ cart }))
}));

export async function getProfile(variables?: CustomerGetQueryVariables) {
  const errors: Error[] = [];
  if (!variables) {
    const existing: Profile | undefined = useCustomer.getState().profile;
    if (!existing) errors.push(new Error('not yet logged in'));
    return {
      profile: existing,
      errors: [] as Error[],
    };
  }
  const result = await ShopifyService.customerGet(variables);

  if (!result || !result.customer)
    errors.push(new Error('Customer Profile returns nullish'));

  return {
    profile: result.customer || undefined,
    errors,
  };
}

export async function register(
  variables: CustomerCreateMutationVariables['input']
) {
  const result = await ShopifyService.customerCreate({
    input: variables,
  });
  if (!result || !result.customerCreate)
    throw new Error('Customer Creation returns nullish');
  return result.customerCreate;
}

export async function login(
  variables: CustomerAccessTokenCreateMutationVariables['input']
) {
  const result = await ShopifyService.customerAccessTokenCreate({
    input: variables,
  });
  if (!result || !result.customerAccessTokenCreate)
    throw new Error('Customer Creation returns nullish');

  const account =
    result.customerAccessTokenCreate.customerAccessToken || undefined;

  useCustomer.setState({
    account: {
      accessToken: account?.accessToken || '',
      expiresAt: new Date(account?.expiresAt || ''),
    },
  });

  return result.customerAccessTokenCreate;
}

export async function getLastAccessToken() {
  return useCustomer.getState().account?.accessToken;
}

export async function update(updates: CustomerUpdateInput) {
  const customerAccessToken = useCustomer.getState().account?.accessToken;
  if (!customerAccessToken) throw new Error('not yet logged in');

  const result = await ShopifyService.customerUpdate({
    customer: updates,
    customerAccessToken,
  });
  if (!result || !result.customerUpdate)
    throw new Error('Customer Update returns nullish');

  return result;
}
