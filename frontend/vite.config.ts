import { defineConfig } from "vite"
import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }]
  },
  server: {
    port: 3000,
  }
})
