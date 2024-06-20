import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './src/main.tsx',  // Ajusta la ruta según donde esté tu punto de entrada principal
        sw: './sw.js',           // Ruta al archivo sw.js
      },
      output: {
        entryFileNames: '[name].[hash].js',    // Nombre del archivo de entrada
        chunkFileNames: '[name].[hash].js',    // Nombre de archivos chunk
        assetFileNames: '[name].[hash].[ext]', // Nombre de archivos de assets
      },
    },
  },
});