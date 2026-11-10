import type { NextConfig } from "next";
import path from "node:path";

const workspaceRoot = path.resolve(__dirname, "../..");

const nextConfig: NextConfig = {
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
