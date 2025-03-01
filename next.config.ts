import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static3.srcdn.com",
      },
      {
        protocol: "https",
        hostname: "**.tmdb.org", // Example for movie posters from TMDB
      },
      {
        protocol: "https",
        hostname: "**.imdb.com", // Example for IMDB images
      },
    ],
  },
};

export default nextConfig;
