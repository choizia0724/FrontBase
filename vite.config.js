import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: './',
    plugins: [react()],

    server: {
      port: 3000,
      proxy: {
        '/opc1':{
          target: "http://localhost:19600",
          changeOrigin: true,
        },
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },

      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),

      },

    },

  }
});