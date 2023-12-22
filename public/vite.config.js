import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host: true,
    strictPort: true,
    port : 3001
  },
  plugins: [react()],
  css:{
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer()
      ]
    }
  }
})
