import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';

export default defineConfig([
  // ESM Build (main)
  {
    input: 'src/objectGenerator.mjs',
    output: {
      file: 'dist/object-generator.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [terser()],
  },
  // TypeScript declarations
  {
    input: 'src/objectGenerator.d.mts',
    output: {
      file: 'dist/object-generator.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
]);