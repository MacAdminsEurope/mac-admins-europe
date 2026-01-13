import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  // output: 'server', // Disabled for GitHub Pages (Static Site Only)
  // adapter: node({
  //   mode: 'standalone',
  // }),
  site: 'https://macadmins-eu.org',
  // base: '/mac-admins-europe', // Not needed for custom domain
  build: {
    assets: 'assets'
  }
});
