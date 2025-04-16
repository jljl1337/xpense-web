import type { NextConfig } from "next";

import { version } from "./package.json";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  env: {
    version,
  },
};

export default nextConfig;
