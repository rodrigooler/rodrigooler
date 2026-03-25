import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cv.html',
        destination: '/cv',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
