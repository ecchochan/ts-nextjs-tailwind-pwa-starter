// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import logger from '@/logger';
import { ShopifyAdminService } from '@/services/shopify-admin/ShopifyAdminService';

export default async function rememberCart(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  if (!body.email || typeof body.email !== 'string')
    res.status(401).json({ err: 'email is not specified.' });

  const { customers } = await ShopifyAdminService.customerSearch({
    query: `email:${body.email}`,
  });

  if (customers.edges.length === 0) {
    const { customerCreate } = await ShopifyAdminService.customerCreate({
      input: {
        email: body.email,
        acceptsMarketing: true,
      },
    });

    if (!customerCreate) throw new Error('customerCreate returns nullish');

    if (customerCreate.userErrors.length > 0) {
      logger.error({ customerCreate });
      return res.status(403).json({ err: 'accessToken is not valid.' });
    }
  } else {
    const { customerUpdate } = await ShopifyAdminService.customerUpdate({
      input: {
        id: customers.edges[0].node.id,
        acceptsMarketing: true,
      },
    });

    if (!customerUpdate) throw new Error('customerCreate returns nullish');

    if (customerUpdate.userErrors.length > 0) {
      logger.error({ customerUpdate });
      return res.status(403).json({ err: 'accessToken is not valid.' });
    }
  }

  res.status(200);
}
