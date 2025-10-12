import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', // щоб ресурси будувались від кореня
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // твій Django backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});