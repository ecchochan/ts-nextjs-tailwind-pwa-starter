import * as React from 'react';

import Fade from '@/animations/Fade';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Put Header or Footer Here
  return (
    <div>
      <Fade.div>{children}</Fade.div>
    </div>
  );
}
