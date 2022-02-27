import * as React from 'react';

import clsxm from '@/lib/clsxm';

import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

import { useHeader } from '@/store/app';

import Fade from '@/animations/Fade';
import MainLayout from '@/layouts/MainLayout';
import center from '@/styles/center';
import layout from '@/styles/layout';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vercel from '~/svg/Vercel.svg';

export default function HomePage() {
  useHeader();

  return (
    <MainLayout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section>
          <Fade.div className={clsxm(layout, center)}>
            <Vercel className='transition-simple fill-slate-800 text-5xl dark:fill-slate-100' />
            <h1 className='mt-4'>
              Next.js + Tailwind CSS + TypeScript Starter
            </h1>
            <p className='mt-2 text-sm'>
              A starter for Next.js, Tailwind CSS, and TypeScript with Absolute
              Import, Seo, Link component, pre-configured with Husky{' '}
            </p>
            <p className='mt-2 text-sm'>
              <ArrowLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter'>
                See the repository
              </ArrowLink>
            </p>

            <ButtonLink className='mt-6' href='/components' variant='light'>
              See all components
            </ButtonLink>

            <footer className='absolute bottom-2'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://theodorusclarence.com?ref=tsnextstarter'>
                Theodorus Clarence
              </UnderlineLink>
            </footer>
          </Fade.div>
        </section>
      </main>
    </MainLayout>
  );
}
