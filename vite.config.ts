import { defineConfig } from 'vite'
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 5175
  }, 
  resolve: {
    alias: {
      '@src': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@types': resolve(__dirname, 'src/types'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@services': resolve(__dirname, 'src/services'),
      '@screens': resolve(__dirname, 'src/screens'),
      '@routes': resolve(__dirname, 'src/routes.ts'),
    }
  }
  // other Vite config options...
})