const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})


module.exports = withPlugins([[withBundleAnalyzer], {
  devIndicators: {
    autoPrerender: false,
  },
  images: {
    domains: ['d1v2sbji1mlin2.cloudfront.net'],
  },
  async headers() {
    return [
      {
        source: '/assets',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          }
        ],
      },
    ]
  },
}]);
