module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    esmExternals: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
        port: '',
        pathname: '/f/**',
      },
      {
        protocol: 'https',
        hostname: 'www.njuskalo.hr',
        port: '',
        // pathname: '/f/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        // pathname: '/f/**',
      },
    ],
  },

};
