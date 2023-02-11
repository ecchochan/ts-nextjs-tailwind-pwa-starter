// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== 'production',
});

const SPA_PATH = '/app';

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  swcMinify: true,

  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },

  async rewrites() {
    return [
      {
        source: `/${SPA_PATH}/:any*`.replace(/\/+/g, '/'),
        destination: SPA_PATH,
      },
    ];
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
  images: process.env.EXPORTING
    ? {
        loader: 'imgix',
        path: '/',
      }
    : undefined,
});

module.exports = nextConfig;
