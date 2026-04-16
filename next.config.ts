import type { NextConfig } from "next";

/** Inlined at build time so `/work-previews/*` URLs can bust CDN/browser caches after deploy. */
const buildId =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.CF_PAGES_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  process.env.COMMIT_REF ||
  "";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_BUILD_ID: buildId,
  },
  async headers() {
    return [
      {
        source: "/work-previews/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
