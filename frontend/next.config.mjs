/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 */

import withTM from "next-transpile-modules";

const nextConfig = withTM(["hexabot-chat-widget"])({
  async rewrites() {
    return [
      {
        source: "/config",
        destination: "/api/config",
      },
    ];
  },
  webpack(config) {
    if (process.env.NODE_ENV === "development") {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    return config;
  },
  publicRuntimeConfig: {
    lang: {
      default: "en",
    },
  },
  output: "standalone",
});

export default nextConfig;
