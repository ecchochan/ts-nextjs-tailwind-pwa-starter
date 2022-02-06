import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

import MainLayout from '@/layouts/MainLayout';

export default function NotFoundPage() {
  return (
    <MainLayout>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center text-black'>
            <RiAlarmWarningFill
              size={60}
              className='animate-flicker drop-shadow-glow text-red-500'
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
