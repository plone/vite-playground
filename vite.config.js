import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import { dependencies } from './package.json';
import path from 'path';

function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@plone/volto',
        replacement: path.resolve(__dirname, 'packages/volto/src'),
      },
      { find: '@root', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  plugins: [
    react(),
    chunkSplitPlugin({
      strategy: 'default',
      customSplitting: {
        ...renderChunks(dependencies),
      },
    }),
  ],
  build: {
    minify: false,
  },
});
