import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.0.17',
        pathname: '/**', // Ruta que usas para las imágenes
      },
    ],
  },
};

export default nextConfig;
