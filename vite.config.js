import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/E-Commerce-Project/', // 👈 ye tumhare repo ka name hai (exact match hona chahiye)
});