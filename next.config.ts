import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // This will disable the ESLint rule during builds
    ignoreDuringBuilds: true,
    // Optionally, you can add specific ESLint configurations like disabling rules here
    // loaderOptions: {
    //   eslint: {
    //     rules: {
    //       '@typescript-eslint/no-explicit-any': 'off',
    //     },
    //   },
    // },
  },
  // Other config options here
};

export default nextConfig;
