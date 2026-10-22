import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({ plugins: [react()], ssr: { noExternal: ['react-helmet-async'] }, build: { rollupOptions: { output: { manualChunks(id) { if (id.includes('node_modules/framer-motion')) return 'motion'; if (id.includes('node_modules/lucide-react')) return 'icons'; if (id.includes('node_modules/sonner') || id.includes('node_modules/@tanstack')) return 'vendor' } } } } })
