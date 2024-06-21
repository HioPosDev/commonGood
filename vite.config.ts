import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'sw.js', // El archivo que quieres copiar
          dest: '' // La carpeta de destino (en este caso, la raíz de 'dist')
        }
      ]
    })
  ],
  server: {
    proxy: {
      '/npush': {
        target: 'http://87.106.125.61',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/npush/, '')
      }
    }
  }
})
