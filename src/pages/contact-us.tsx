import * as React from 'react';

import Seo from '@/components/Seo';

import MainLayout from '@/layouts/MainLayout';

export default function ComponentsPage() {
  return (
    <MainLayout>
      <Seo
        templateTitle='Contact Us'
        description='Contact us for more details'
      />

      <main>Contact Us</main>
    </MainLayout>
  );
}

export function getStaticProps() {
  return {
    props: {},
  };
}
