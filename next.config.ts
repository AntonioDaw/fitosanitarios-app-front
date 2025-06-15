import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**', // Ruta que usas para las imágenes
      },
    ],
  },
};

export default nextConfig;
