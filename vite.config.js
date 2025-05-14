import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// GitHub Pages deploys to a subdirectory matching the repo name
// Use the repository name from package.json for the base path in production
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/jmcdev.site/' : '/'
})
