import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Update: Using custom domain so base path should be root
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    assetsInlineLimit: 0, // Don't inline font files
  },
})
