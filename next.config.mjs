/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  webpack: (config, { dev, isServer }) => {
    // Optimize webpack cache serialization
    if (!dev && !isServer) {
      config.cache = {
        ...config.cache,
        type: "filesystem",
        cacheDirectory: ".next/cache/webpack",
        store: "pack",
        buildDependencies: {
          config: [__filename],
        },
        // Use Buffer for serializing large strings
        serializer: {
          serialize: (data) => {
            const serialized = JSON.stringify(data);
            return Buffer.from(serialized);
          },
          deserialize: (buffer) => {
            const serialized = buffer.toString();
            return JSON.parse(serialized);
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
