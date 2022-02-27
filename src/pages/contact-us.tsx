import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Seo from '@/components/Seo';

import { useHeader } from '@/store/app';

import Fade from '@/animations/Fade';
import MainLayout from '@/layouts/MainLayout';
import center from '@/styles/center';
import layout from '@/styles/layout';

export default function ComponentsPage() {
  useHeader();

  return (
    <MainLayout>
      <Seo
        templateTitle='Contact Us'
        description='Contact us for more details'
      />

      <main>
        <section>
          <Fade.div className={clsxm(layout, center)}>
            <h1 className='mt-4'>Contact Us</h1>
          </Fade.div>
        </section>
      </main>
    </MainLayout>
  );
}

export function getStaticProps() {
  return {
    props: {},
  };
}
