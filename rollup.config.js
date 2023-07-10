import clear from 'rollup-plugin-clear';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'es/index.js',
      format: 'esm',
    },
    {
      file: 'lib/index.js',
      format: 'cjs',
    },
  ],
  plugins: [
    clear({
      targets: ['lib', 'es'],
    }),
    typescript(),
    commonjs(),
    nodeResolve({ preferBuiltins: true }),
    json(),
  ],
};
