/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    globals: true,
  },
  resolve: {
    alias: {
      // "@": path.resolve(__dirname, "./src"),
      "@styles": "/src/styles",
      "@components": "/src/components",
      "@views": "/src/views",
      "@api": "/src/api",
      "@/*": "/src/*",
      "@test-utils": "/src/utils/test-utils",
    },
    mainFields: ["module"],
  },
})
