import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// `base: './'` makes the build work from any sub-path (e.g. GitHub Pages).
export default defineConfig({
  base: './',
  plugins: [react()],
  worker: { format: 'es' },
  build: { chunkSizeWarningLimit: 800 }, // recharts is large; fine for a teaching app
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
