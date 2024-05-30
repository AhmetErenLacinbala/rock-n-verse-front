import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/gltf/*',
          dest: 'gltf'
        }
      ]
    })
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  },
  resolve: {
    alias: {
      '@gltf': '/src/gltf'
    }
  }
});
