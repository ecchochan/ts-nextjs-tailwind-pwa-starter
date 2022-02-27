import {
  GetProductListQueryVariables,
  GetProductSingleQuery,
  ShopifyService,
} from './ShopifyService';

export type Product = NonNullable<GetProductSingleQuery['product']>;

export async function getProduct(handle: string): Promise<Product> {
  const { product } = await ShopifyService.getProductSingle({ handle });

  if (!product) throw new Error('productByHandle is nullish');

  return product;
}

export async function getProducts(
  variables?: GetProductListQueryVariables
): Promise<{ products: Product[]; pageInfo: { hasNextPage: boolean } }> {
  const { products } = await ShopifyService.getProductList(variables);

  const { edges, pageInfo } = products;

  return { products: edges.map(({ node }) => node), pageInfo };
}
