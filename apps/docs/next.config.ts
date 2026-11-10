import type { NextConfig } from "next";
import path from "node:path";

const workspaceRoot = path.resolve(__dirname, "../..");

const nextConfig: NextConfig = {
  // Storybook needs its trailing slash so relative assets stay under /stroybook/.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [{ source: "/stroybook/", destination: "/stroybook/index.html" }];
  },
  transpilePackages: ["luminescent"],
  turbopack: {
    root: workspaceRoot,
  },
  outputFileTracingRoot: workspaceRoot,
  outputFileTracingIncludes: {
    "/docs/*": ["./content/docs/**/*"],
  },
};

export default nextConfig;
