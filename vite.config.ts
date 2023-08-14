import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { DateTime } from 'luxon';

// // https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: { assetsDir: '' },
  define: {
    'process.env.UPDATE_DATE': DateTime.now()
  }
});
