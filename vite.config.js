import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Update: Using custom domain so base path should be root
export default defineConfig({
  plugins: [react()],
  base: '/'
})
