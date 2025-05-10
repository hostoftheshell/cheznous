// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://cheznous89270.fr",
  integrations: [react(), sitemap()],
});
