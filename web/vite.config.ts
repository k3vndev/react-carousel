import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@k3vndev/react-carousel',
        replacement: path.resolve(__dirname, '../src/index.ts')
      }
    ]
  },
  plugins: [react(), tailwindcss()]
})
