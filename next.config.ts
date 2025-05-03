
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['react-intersection-observer'], // Add this line
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Remove experimental layout prop configuration if it exists,
  // as 'fill' is now the recommended approach and doesn't need explicit enabling.
  // experimental: {
  //   images: {
  //     layoutRaw: true, // Remove this line if present
  //   },
  // },
};

export default nextConfig;
