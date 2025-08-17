/** @type {import('next').NextConfig} */
// Configuração do Next.js para Vercel
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
