import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  site: 'https://yourusername.github.io',
  // base: '/mac-admins-europe', // Uncomment for GitHub Pages deployment
  build: {
    assets: 'assets'
  }
});
