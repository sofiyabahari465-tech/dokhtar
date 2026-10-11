import type { NextConfig } from "next";

// For GitHub Pages deployment, set basePath to your repo name
// e.g. if your repo is `username/dokhtar`, set basePath to `/dokhtar`
const repoName = "dokhtar";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages — generates a fully static site in `out/`
  output: "export",
  // basePath for GitHub Pages project sites (https://username.github.io/dokhtar/)
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
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

