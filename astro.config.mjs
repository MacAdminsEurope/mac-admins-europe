import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  // output: 'server', // Disabled for GitHub Pages (Static Site Only)
  // adapter: node({
  //   mode: 'standalone',
  // }),
  site: 'https://macadminseurope.github.io',
  base: '/mac-admins-europe', // Required for GitHub Pages project sites
  build: {
    assets: 'assets'
  }
});
