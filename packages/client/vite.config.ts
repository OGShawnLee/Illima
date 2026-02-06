import Vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import VueDevTools from "vite-plugin-vue-devtools";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import {
  presetWind3,
  presetWebFonts,
  transformerVariantGroup,
  transformerDirectives,
} from "unocss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    VueDevTools(),
    UnoCSS({
      presets: [
        presetWind3(),
        presetWebFonts({
          provider: "fontshare",
          fonts: {
            satoshi: "Satoshi",
          },
        }),
      ],
      transformers: [
        transformerDirectives({
          applyVariable: "--uno",
        }),
        transformerVariantGroup(),
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
