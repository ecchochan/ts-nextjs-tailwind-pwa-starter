import * as React from 'react';

import clsxm from '@/lib/clsxm';

import { useDarkMode } from '@/store/app';

type SkeletonProps = React.ComponentPropsWithoutRef<'div'>;

export default function Skeleton({ className, ...rest }: SkeletonProps) {
  const darkMode = useDarkMode()[0];
  return (
    <div
      className={clsxm(
        'animate-shimmer bg-[#f6f7f8] dark:bg-[#202020]',
        className
      )}
      style={{
        backgroundImage: darkMode
          ? 'linear-gradient(to right, #202020 0%, #3b3b3b 20%, #202020 40%, #202020 100%)'
          : 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
        backgroundSize: '700px 100%',
        backgroundRepeat: 'no-repeat',
      }}
      {...rest}
    />
  );
}
