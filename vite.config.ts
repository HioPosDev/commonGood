import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL)
    },
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: 'sw.js',
            dest: ''
          }
        ]
      })
    ],
  }
})