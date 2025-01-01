module.exports = {
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
    ];
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      // Enable code splitting for modern browsers using the 'module/nomodule' pattern
      config.output.publicPath = '/_next/';

      // Use babel-loader for modern JavaScript
      config.module.rules.push({
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: 'defaults', // Use a modern browser list
                  useBuiltIns: 'entry', // Polyfill only necessary features
                  corejs: 3, // Use core-js 3 for polyfilling
                },
              ],
            ],
          },
        },
      });
    }

    return config;
  },
  // Optional: add custom Babel configuration if necessary (e.g., polyfills and modern JavaScript handling)
  babel: {
    presets: ['next/babel', '@babel/preset-env'],
    plugins: [],
  },
};
