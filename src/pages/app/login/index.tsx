import * as React from 'react';

export default function LoginPage({
  children,
}: {
  children?: React.ReactNode;
}) {
  // Put Header or Footer Here
  return (
    <>
      Hello
      {children}
    </>
  );
}
