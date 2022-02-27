import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import clsxm from '@/lib/clsxm';

import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

import { useHeader } from '@/store/app';

import MainLayout from '@/layouts/MainLayout';
import center from '@/styles/center';
import layout from '@/styles/layout';

export default function NotFoundPage() {
  useHeader();

  return (
    <MainLayout>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='bg-white'>
          <div className={clsxm(layout, center, 'text-black')}>
            <RiAlarmWarningFill
              size={60}
              className='drop-shadow-glow animate-flicker text-red-500'
            />
            <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
            <ArrowLink className='mt-4 md:text-lg' href='/'>
              Back to Home
            </ArrowLink>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
