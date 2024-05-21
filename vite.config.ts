import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@styles": "/src/styles",
      "@components": "/src/components",
      "@views": "/src/views",
      "@api": "/src/api",
      "@/*": "/src/*",
    },
    mainFields: ["module"],
  },
})
