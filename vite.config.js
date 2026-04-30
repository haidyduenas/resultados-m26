import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path for GitHub Pages deployment at https://haidyduenas.github.io/resultados-m26/
export default defineConfig({
  base: '/resultados-m26/',
  plugins: [react()],
  server: {
    port: 5173,
    fs: {
      allow: ['..', '.'],
    },
  },
});
