import { createElement, useEffect, useRef, useState } from 'react';

function useStaticContent() {
  const ref = useRef<HTMLElement>(null);
  const [render, setRender] = useState(typeof window === 'undefined');

  useEffect(() => {
    // check if client side navigation
    // need to render the component without server-side backup
    if (typeof window !== 'undefined') {
      setRender(true);
    }
  }, []);

  return [render, ref];
}

interface Props {
  children: React.ReactNode;
  element?: string;
  [key: string]: unknown;
}

export default function StaticContent(props: Props) {
  const { children, element = 'div', ...otherProps } = props;
  const [render, ref] = useStaticContent();

  // if we're in the server or a spa navigation, just render it
  if (render) {
    return createElement(
      element,
      {
        ...otherProps,
      },
      children
    );
  }

  // avoid re-render on the client
  return createElement(element, {
    ...otherProps,
    ref,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: '' },
  });
}
