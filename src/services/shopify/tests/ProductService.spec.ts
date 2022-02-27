import { getProducts } from '@/services/shopify/ProductService';

describe('Product Service', () => {
  it('return a list of products', async () => {
    const { products, pageInfo } = await getProducts();
    expect(Array.isArray(products)).toBeTruthy();
    expect(typeof pageInfo.hasNextPage === 'boolean').toBeTruthy();

    // console.log(JSON.stringify(products, null, 2));

    const _example_products = [
      {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3OTM0Mjg4OTM3NTY=',
        cursor:
          'eyJsYXN0X2lkIjo2NzkzNDI4ODkzNzU2LCJsYXN0X3ZhbHVlIjoiNjc5MzQyODg5Mzc1NiJ9',
        url: '/products/alocasia',
        title: 'Alocasia',
        description:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literat...',
        image: {
          src: 'https://cdn.shopify.com/s/files/1/0561/0209/2860/products/Ecomm_05_Alocasia_008_768x1024_crop_center.jpg?v=1644733168',
          alt: '',
        },
        price: { amount: 15, currencyCode: 'HKD' },
      },
    ];
  });
});
