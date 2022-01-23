import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function ComponentsPage() {
  return (
    <Layout>
      <Seo
        templateTitle='Contact Us'
        description='Contact us for more details'
      />

      <main>Contact Us</main>
    </Layout>
  );
}

export function getStaticProps() {
  return {
    props: {},
  };
}
