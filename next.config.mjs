/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n is handled via middleware + subdirectory routing in App Router
  // We'll use /de/ and /fr/ subdirectories
  webpack: (config, { isServer }) => {
    // tiktoken WASM support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    // Fix for tiktoken in Next.js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    return config;
  },
};

export default nextConfig;
