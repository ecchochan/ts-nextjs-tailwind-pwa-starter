// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import * as CustomerService from '@/services/shopify/CustomerService';
import { ShopifyAdminService } from '@/services/shopify-admin/ShopifyAdminService';

export default async function rememberCart(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  if (!body.cartId || typeof body.cartId !== 'string')
    res.status(401).json({ err: 'cartId is not specified.' });
  if (!body.accessToken || typeof body.accessToken !== 'string')
    res.status(403).json({ err: 'accessToken is not specified.' });

  const { profile, errors } = await CustomerService.getProfile({
    customerAccessToken: body.accessToken,
  });

  if (errors.length > 0 || !profile)
    return res.status(403).json({ err: 'accessToken is not valid.' });

  const { customerUpdate } = await ShopifyAdminService.customerUpdate({
    input: {
      id: profile.id,
      metafields: [
        {
          key: 'last_cart_id',
          namespace: 'cart',
          value: body.cartId,
        },
      ],
    },
  });

  res.status(200).json(customerUpdate);
}
