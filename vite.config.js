import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // ✅ Tambahkan ini

export default defineConfig({
  plugins: [react()], // ✅ Hanya sekali
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      // Contoh: @components => src/components
      // '@': path.resolve(__dirname, 'src'),
    },
  },
});