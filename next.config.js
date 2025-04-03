// next.config.js
const nextConfig = {
  reactStrictMode: false, // Optional: keep as false if you need relaxed React behavior

  images: {
    domains: ['www.birmingham365.org'], // Keep your image domain configuration
  },

  webpack(config, { dev, isServer }) {
    if (dev) {
      // Enable source maps in development mode
      config.devtool = 'source-map';
    }

    return config;
  },
};

module.exports = nextConfig;