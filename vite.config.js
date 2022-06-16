import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
	outDir: 'docs'
  },
  server: {
		host: 'localhost',
		https: false,
		hmr: {
			clientPort: 443
		}
	}
})
