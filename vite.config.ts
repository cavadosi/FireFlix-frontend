import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const apiBaseUrl = process.env.VITE_API_BASE_URL

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: apiBaseUrl, // ASP.NET Backend
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
