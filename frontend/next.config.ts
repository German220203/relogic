import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "api.relogic.com", // tu dominio del backend en producción
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
