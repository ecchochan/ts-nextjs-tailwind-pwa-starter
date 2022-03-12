import * as React from 'react';

import DarkModeToggler from '@/components/buttons/DarkModeToggler';
import UnstyledLink from '@/components/links/UnstyledLink';

import Fade from '@/animations/Fade';

const links = [
  { href: '/', label: 'Home' },
  { href: '/contact-us', label: 'Contact Us' },
];

export default function Header() {
  return (
    <header className='fixed top-0 z-50 w-full'>
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
