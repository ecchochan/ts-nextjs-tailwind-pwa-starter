import * as React from 'react';

interface Props {
  children?: React.ReactNode;
}

export default function LoginPage(props: Props) {
  const { children } = props;
  // Put Header or Footer Here
  return (
    <main>
      <section>
        <div className='layout wrapper'>
          <div>
            <h1 className='mt-4'>Login Page</h1>
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
