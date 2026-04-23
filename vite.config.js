import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom'))      return 'react-dom';
          if (id.includes('node_modules/react/'))         return 'react-core';
          if (id.includes('node_modules/framer-motion'))  return 'motion';
          if (id.includes('node_modules/react-router'))   return 'router';
          if (id.includes('node_modules/axios'))          return 'http';
          if (id.includes('node_modules/zustand'))        return 'state';
        },
      },
    },
    // Avisa si algún chunk supera 400 kB
    chunkSizeWarningLimit: 400,
  },
})
