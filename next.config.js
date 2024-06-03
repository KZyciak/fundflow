/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Ignore warnings in CI
    if (process.env.CI === "false") {
      config.plugins.push(new webpack.IgnorePlugin(/.*/));
    }

    return config;
  },
};

module.exports = nextConfig;
