import * as React from 'react';

import Header from './Header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Put Header or Footer Here
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
