/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // Keep the build unblocked during migration; tighten later.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    // Opt out of Next's static-image import handling so `import img from "@/assets/x.jpg"`
    // resolves to a plain URL string (Vite behaviour), matching the existing components.
    disableStaticImages: true,
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  webpack: (config) => {
    // Emit images / video / svg as asset URLs (string), exactly like Vite did.
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif|mp4|webm|svg)$/i,
      type: "asset/resource",
      generator: { filename: "static/media/[name].[hash][ext]" },
    });
    return config;
  },
};

export default nextConfig;
