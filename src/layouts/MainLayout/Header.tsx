import * as React from 'react';

import DarkModeToggler from '@/components/buttons/DarkModeToggler';
import UnstyledLink from '@/components/links/UnstyledLink';

import Fade from '@/animations/Fade';

const links = [
  { href: '/', label: 'Route 1' },
  { href: '/', label: 'Route 2' },
];

export default function Header() {
  return (
    <header className='fixed top-0 z-50 w-full'>
      <Fade className='layout flex justify-between items-center h-12 lg:h-14'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          Home
        </UnstyledLink>
        <nav>
          <ul className='flex justify-between items-center space-x-4'>
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
      </Fade>
    </header>
  );
}
