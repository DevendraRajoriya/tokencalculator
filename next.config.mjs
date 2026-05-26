/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n is handled via middleware + subdirectory routing in App Router
  // We'll use /de/ and /fr/ subdirectories
  webpack: (config, { webpack, isServer }) => {
    // Stub out Node.js-only native addons — never needed in the browser
    config.resolve.alias = {
      ...config.resolve.alias,
      "sharp$": false,
      "onnxruntime-node$": false,
    };

    // Ignore ALL ONNX Runtime asset imports (ort-wasm-*, ort.webgpu.*, ort.bundle.*, etc.)
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(ort-wasm|ort\.webgpu|ort\.bundle|ort\.node|ort\.all)/,
      })
    );

    // pdfjs-dist: prevent webpack from trying to bundle the worker internals
    // The worker is served as a static file from /public/pdf.worker.min.mjs
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /pdf\.worker/,
      })
    );

    // Browser-only node built-in fallbacks
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        "node:fs": false,
        "node:path": false,
        "node:crypto": false,
        canvas: false,
      };
    }

    return config;
  },
};

export default nextConfig;


