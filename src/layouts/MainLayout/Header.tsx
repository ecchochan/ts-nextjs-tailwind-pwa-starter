import * as React from 'react';

import style from './Header.module.scss';

import clsxm from '@/lib/clsxm';

import DarkModeToggler from '@/components/buttons/DarkModeToggler';
import UnstyledLink from '@/components/links/UnstyledLink';

import { useDarkMode } from '@/store/app';
import { useScrollState } from '@/store/window';

import Fade from '@/animations/Fade';

const links = [
  { href: '/', label: 'Home' },
  { href: '/contact-us', label: 'Contact Us' },
  { href: '/app', label: 'Login' },
];

export default function Header() {
  const darkMode = useDarkMode()[0];
  const { isTop, scrollingUp } = useScrollState();
  return (
    <header
      className={clsxm(
        style.transition,
        'fixed top-0 z-50 w-full',
        scrollingUp || isTop ? 'opacity-1' : '-translate-y-full opacity-0'
      )}
    >
      <div
        style={{
          opacity: darkMode ? 1 : 0,
        }}
        className={clsxm(
          style.transition,
          style.darkGradient,
          'absolute -z-10 h-full w-full pb-3'
        )}
      ></div>
      <div
        style={{
          opacity: darkMode ? 0 : 1,
        }}
        className={clsxm(
          style.transition,
          style.whiteGradient,
          'absolute -z-10 h-full w-full pb-3'
        )}
      ></div>
      <Fade.div className='layout flex h-12 items-center justify-between laptop:h-14'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          Logo
        </UnstyledLink>
        <nav>
          <ul className='flex items-center justify-between space-x-4'>
            <DarkModeToggler />
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className='hover:text-gray-600'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
        </nav>
      </Fade.div>
    </header>
  );
}
