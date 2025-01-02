module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
  images: {
    domains: ['d1v2sbji1mlin2.cloudfront.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd1v2sbji1mlin2.cloudfront.net',
        port: '',
        pathname: '/media/**',
        search: '',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          }
        ],
      },
    ]
  },
};
