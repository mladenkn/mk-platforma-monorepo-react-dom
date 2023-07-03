module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    esmExternals: false,
  },
};
