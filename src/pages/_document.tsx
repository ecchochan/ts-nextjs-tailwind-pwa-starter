import crypto from 'crypto';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { v4 } from 'uuid';

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
  csp += `base-uri 'self';`;
  csp += `style-src 'self' https://fonts.googleapis.com 'unsafe-inline';`; // NextJS requires 'unsafe-inline'
  csp += `script-src 'nonce-${nonce}' 'self' ${
    production ? 'unsafe-inline' : "'unsafe-eval'"
  };`; // NextJS requires 'self' and 'unsafe-eval' in dev (faster source maps)
  csp += `font-src 'self' https://fonts.gstatic.com;`;
  if (!production) csp += `connect-src 'self';`;

  return [csp, nonce];
};

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const [csp, nonce] = generateCsp();
    return (
      <Html lang='en'>
        <Head nonce={nonce}>
          <meta property='csp-nonce' content={nonce} />
          <meta httpEquiv='Content-Security-Policy' content={csp} />
          <link
            rel='preload'
            href='/fonts/inter-var-latin.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
