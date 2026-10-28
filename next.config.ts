import type { NextConfig } from "next";

// The FastAPI backend. Browser calls go to same-origin /api/* and are proxied here,
// so the HttpOnly session cookie works without CORS.
const API_ORIGIN = process.env.API_ORIGIN ?? "http://localhost:8000";

const nextConfig: NextConfig = {
  // Lets a second dev server run beside the main one (e.g. against another API port).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Emits a minimal self-contained server (<distDir>/standalone) so the Docker image
  // ships only what it needs instead of the whole node_modules folder.
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        // Only our own CSS: next/font's generated stylesheets must not go through Tailwind
        // (it rewrites their url() and breaks font resolution in dev).
        condition: { path: /^src\// },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_ORIGIN}/api/:path*` }];
  },
};

export default nextConfig;
