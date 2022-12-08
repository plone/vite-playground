import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import { dependencies } from './package.json';
import path from 'path';
// Vite does not load the aliases here (yet), so it has to be:
import createAddonsLoader from '@plone/volto/src/create-addons-loader.cjs';
import AddonConfigurationRegistry from '@plone/volto/src/addon-registry.cjs';

function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

const registry = new AddonConfigurationRegistry(__dirname);

const addonsLoaderPath = createAddonsLoader(
  registry.getAddonDependencies(),
  registry.getAddons(),
);

const registryAliasesObj = {
  ...registry.getAddonCustomizationPaths(),
  ...registry.getAddonsFromEnvVarCustomizationPaths(),
  ...registry.getProjectCustomizationPaths(),
  ...registry.getResolveAliases(),
};

// Normalize from key:value object to an array of objects
const registryAliasesArray = [];
Object.entries(registryAliasesObj).forEach(([k, v]) =>
  registryAliasesArray.push({ find: k, replacement: v }),
);

export default defineConfig({
  resolve: {
    alias: [
      ...registryAliasesArray,
      {
        find: '@plone/volto',
        replacement: `${registry.voltoPath}/src`,
      },
      { find: '@root', replacement: path.resolve(__dirname, 'src') },
      { find: 'load-volto-addons', replacement: addonsLoaderPath },
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
