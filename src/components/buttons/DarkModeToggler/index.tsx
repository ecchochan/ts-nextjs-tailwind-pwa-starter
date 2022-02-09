import * as React from 'react';

import style from './style.module.scss';

if (typeof window !== 'undefined') {
  if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export default function DarkModeToggler() {
  const [isDark, setIsDark] = React.useState(
    localStorage.getItem('color-theme') === 'dark'
  );
  return (
    <label className={style['dark-mode-toggler']}>
      <input
        className={style['toggle-checkbox']}
        type='checkbox'
        checked={isDark}
        onChange={() => {
          setIsDark(!isDark);
          // if set via local storage previously
          if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
              document.documentElement.classList.add('dark');
              localStorage.setItem('color-theme', 'dark');
            } else {
              document.documentElement.classList.remove('dark');
              localStorage.setItem('color-theme', 'light');
            }

            // if NOT set via local storage previously
          } else {
            if (document.documentElement.classList.contains('dark')) {
              document.documentElement.classList.remove('dark');
              localStorage.setItem('color-theme', 'light');
            } else {
              document.documentElement.classList.add('dark');
              localStorage.setItem('color-theme', 'dark');
            }
          }
        }}
      ></input>
      <div className={style['toggle-slot']}>
        <div className={style['sun-icon-wrapper']}>
          <svg
            aria-hidden='true'
            focusable='false'
            preserveAspectRatio='xMidYMid meet'
            viewBox='0 0 24 24'
            className={style['sun-icon']}
          >
            <g
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='12' cy='12' r='5'></circle>
              <path d='M12 1v2'></path>
              <path d='M12 21v2'></path>
              <path d='M4.22 4.22l1.42 1.42'></path>
              <path d='M18.36 18.36l1.42 1.42'></path>
              <path d='M1 12h2'></path>
              <path d='M21 12h2'></path>
              <path d='M4.22 19.78l1.42-1.42'></path>
              <path d='M18.36 5.64l1.42-1.42'></path>
            </g>
          </svg>
        </div>
        <div className={style['moon-icon-wrapper']}>
          <svg
            aria-hidden='true'
            focusable='false'
            preserveAspectRatio='xMidYMid meet'
            viewBox='0 0 24 24'
            className={style['moon-icon']}
          >
            <g
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z'></path>
            </g>
          </svg>
        </div>
      </div>
    </label>
  );
}
