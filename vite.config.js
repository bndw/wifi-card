import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Custom card CSS could otherwise load remote files, so block every request
// the app doesn't need. Build only, because the dev server needs a websocket.
const csp = {
  name: 'content-security-policy',
  apply: 'build',
  transformIndexHtml: () => [
    {
      tag: 'meta',
      attrs: {
        'http-equiv': 'Content-Security-Policy',
        content:
          "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; manifest-src 'self'; connect-src 'none'; base-uri 'none'; form-action 'none'",
      },
      injectTo: 'head-prepend',
    },
  ],
};

export default defineConfig({
  plugins: [react(), csp],
  server: {
    port: 3000,
  },
});
