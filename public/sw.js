if (!self.define) {
  let e,
    n = {};
  const i = (i, c) => (
    (i = new URL(i + '.js', c).href),
    n[i] ||
      new Promise((n) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = i), (e.onload = n), document.head.appendChild(e);
        } else (e = i), importScripts(i), n();
      }).then(() => {
        let e = n[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, s) => {
    const a =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (n[a]) return;
    let o = {};
    const r = (e) => i(e, a),
      t = { module: { uri: a }, exports: o, require: r };
    n[a] = Promise.all(c.map((e) => t[e] || r(e))).then((e) => (s(...e), o));
  };
}
define(['./workbox-1846d813'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/RmyoIxuGQ07OVc4X943qR/_buildManifest.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/RmyoIxuGQ07OVc4X943qR/_middlewareManifest.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/RmyoIxuGQ07OVc4X943qR/_ssgManifest.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/chunks/225-3f55f1d5d7783e3d.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/chunks/31664189-3c54e41febee8096.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/chunks/337-81eb5fe01ea13052.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/chunks/78e521c3-19390034046d4528.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/chunks/892-8365351fb3740b3b.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/chunks/framework-91d7f78b5b4003c8.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/chunks/main-ec95d66e0c86d60d.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/chunks/pages/404-91b1670da8c74875.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/chunks/pages/_app-4aa47c7c309663cc.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/chunks/pages/_error-2280fa386d040b66.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/chunks/pages/components-89c799e9a0e0f5ed.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/chunks/pages/index-35227675b27bb206.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/chunks/polyfills-5cd94c89d3acac5f.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/chunks/webpack-514908bffb652963.js',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/_next/static/css/72188a210d0a1674.css',
          revision: 'RmyoIxuGQ07OVc4X943qR',
        },
        {
          url: '/favicon/android-icon-144x144.png',
          revision: '3ed02b758ebbfe4fc800430e022f35a6',
        },
        {
          url: '/favicon/android-icon-192x192.png',
          revision: '46e1e2f5ec0e1c910020aee5c57bca9e',
        },
        {
          url: '/favicon/android-icon-36x36.png',
          revision: '62933c6cf5e7d3f675a73c33e52f7111',
        },
        {
          url: '/favicon/android-icon-48x48.png',
          revision: 'dc438c34ba095e3200e7ec531fcd65d2',
        },
        {
          url: '/favicon/android-icon-72x72.png',
          revision: 'fe7148232d928b33d84a3837e95fbf04',
        },
        {
          url: '/favicon/android-icon-96x96.png',
          revision: '513282af1b5942ecfeab09086ba84375',
        },
        {
          url: '/favicon/apple-icon-114x114.png',
          revision: '5f258900d06ec56044c35f1eafed932c',
        },
        {
          url: '/favicon/apple-icon-120x120.png',
          revision: '5d67a33e2fa6468b794df13076bde668',
        },
        {
          url: '/favicon/apple-icon-144x144.png',
          revision: '3ed02b758ebbfe4fc800430e022f35a6',
        },
        {
          url: '/favicon/apple-icon-152x152.png',
          revision: 'c22d827e791a494336af10cac9772431',
        },
        {
          url: '/favicon/apple-icon-180x180.png',
          revision: '1a34c4e1f1b40219cf11588535f3e6a0',
        },
        {
          url: '/favicon/apple-icon-57x57.png',
          revision: 'e38eaf63d76871b003e251782baa5ac3',
        },
        {
          url: '/favicon/apple-icon-60x60.png',
          revision: 'b6c8b330a75b958a4f7d60c6f24d22c9',
        },
        {
          url: '/favicon/apple-icon-72x72.png',
          revision: 'fe7148232d928b33d84a3837e95fbf04',
        },
        {
          url: '/favicon/apple-icon-76x76.png',
          revision: '86ea6750ea89ec3f35fcc6bd0b229d5e',
        },
        {
          url: '/favicon/apple-icon-precomposed.png',
          revision: '8b46488774a2be96d2c81e86b3f6d84a',
        },
        {
          url: '/favicon/apple-icon.png',
          revision: '8b46488774a2be96d2c81e86b3f6d84a',
        },
        {
          url: '/favicon/browserconfig.xml',
          revision: '653d077300a12f09a69caeea7a8947f8',
        },
        {
          url: '/favicon/favicon-16x16.png',
          revision: 'f725bd1365ead1702012d0ca4e693361',
        },
        {
          url: '/favicon/favicon-32x32.png',
          revision: 'e3e5d69bc640065965bd89be78125009',
        },
        {
          url: '/favicon/favicon-96x96.png',
          revision: '513282af1b5942ecfeab09086ba84375',
        },
        {
          url: '/favicon/favicon.ico',
          revision: 'b06c66a065398ce1cc5558a8a925c73f',
        },
        {
          url: '/favicon/large-og.jpg',
          revision: '54cbf4b8f396a652ed05c560e0b6d003',
        },
        {
          url: '/favicon/manifest.json',
          revision: '2cb1641030856b343a54a7b78ade9295',
        },
        {
          url: '/favicon/ms-icon-144x144.png',
          revision: '3ed02b758ebbfe4fc800430e022f35a6',
        },
        {
          url: '/favicon/ms-icon-150x150.png',
          revision: '7fcc2177d08a606f0fac6685a16235a7',
        },
        {
          url: '/favicon/ms-icon-310x310.png',
          revision: '2c80c067241181c38d5fcd93740d6c4b',
        },
        {
          url: '/favicon/ms-icon-70x70.png',
          revision: 'ebff944b7f1ef2b87affc5b39cdfafae',
        },
        {
          url: '/fonts/inter-var-latin.woff2',
          revision: '812b3dd29751112389e93387c4f7dd0a',
        },
        {
          url: '/images/new-tab.png',
          revision: 'b2001de5c7ebe41cf372e676d09014f4',
        },
        { url: '/manifest.json', revision: 'b9a7e23fc024e36d371b887313adc1e8' },
        { url: '/robots.txt', revision: '12c1b30978435c5968e8475c0693af6d' },
        { url: '/sitemap.xml', revision: '284b7aebc99787f0a26afb576be6e619' },
        {
          url: '/svg/Vercel.svg',
          revision: 'c7d8efd08fe7e7a36a602b096e779a38',
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: n,
              event: i,
              state: c,
            }) =>
              n && 'opaqueredirect' === n.type
                ? new Response(n.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: n.headers,
                  })
                : n,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const n = e.pathname;
        return !n.startsWith('/api/auth/') && !!n.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
