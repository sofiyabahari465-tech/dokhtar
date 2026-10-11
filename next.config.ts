import type { NextConfig } from "next";

// For GitHub Pages deployment, set basePath to your repo name
// e.g. if your repo is `username/girls-day`, set basePath to `/girls-day`
const repoName = process.env.GITHUB_REPOSITORY
  ? process.env.GITHUB_REPOSITORY.split("/")[1]
  : "";

const nextConfig: NextConfig = {
  output: "standalone",
  // basePath for GitHub Pages — empty string for Vercel/root domain
  ...(repoName && !process.env.VERCEL
    ? { basePath: `/${repoName}`, assetPrefix: `/${repoName}/` }
    : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
