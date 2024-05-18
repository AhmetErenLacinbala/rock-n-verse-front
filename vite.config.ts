import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import macrosPlugin from "babel-plugin-macros";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-glsl", macrosPlugin]
      }
    })
  ]
});
