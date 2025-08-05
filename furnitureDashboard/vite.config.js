// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/sub/',  // <---- set base path here
  plugins: [react()],
});
