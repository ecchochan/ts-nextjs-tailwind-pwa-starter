import crypto from 'crypto';
import { Head, Html, Main, NextScript } from 'next/document';
import { v4 } from 'uuid';

import { GA_TRACKING_ID } from '@/lib/gtag';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Generate Content Security Policy for the app.
 * Uses randomly generated nonce (base64)
 *
 * @returns [csp: string, nonce: string] - CSP string in first array element, nonce in the second array element.
 */
const generateCsp = (): [csp: string, nonce: string] => {
  const production = process.env.NODE_ENV === 'production';

  // generate random nonce converted to base64. Must be different on every HTTP page load
  const hash = crypto.createHash('sha256');
  hash.update(v4());
  const nonce = hash.digest('base64');

  let csp = ``;
  csp += `default-src 'self';`;
  csp += `connect-src 'self' https://www.google-analytics.com;`;
  csp += `base-uri 'self';`;
  csp += `style-src 'self' https://fonts.googleapis.com 'unsafe-inline';`; // NextJS requires 'unsafe-inline'
  csp += `script-src 'nonce-${nonce}' 'self' ${
    production ? "'unsafe-inline'" : "'unsafe-eval'"
  };`; // NextJS requires 'self' and 'unsafe-eval' in dev (faster source maps)
  csp += `font-src 'self' https://fonts.gstatic.com;`;

  return [csp, nonce];
};

export default function Document() {
  const [csp, nonce] = generateCsp();
  return (
    <Html lang='en'>
      <Head nonce={nonce}>
        <meta property='csp-nonce' content={nonce} />
        <meta httpEquiv='Content-Security-Policy' content={csp} />
        {/* 
          <link
            rel='preload'
            href='/fonts/inter-var-latin.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          */}
        <link
          href='https://fonts.googleapis.com/css2?family=Barlow&display=optional'
          rel='stylesheet'
        />
        {/* enable analytics script only for production */}
        {isProduction && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              nonce={nonce}
            />
            <script
              nonce={nonce}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
              }}
            />
          </>
        )}
      </Head>
      <body className='transition-simple bg-white text-gray-800 dark:bg-dark dark:text-gray-100'>
        <Main />
        <NextScript nonce={nonce} />
      </body>
    </Html>
  );
}
