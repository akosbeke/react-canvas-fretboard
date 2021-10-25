import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import {terser} from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [typescript({tsconfig: './tsconfig.json'}), terser()],
  },
  {
    input: './dist/dts/index.d.ts',
    output: [{file: 'dist/index.d.ts', format: 'es'}],
    plugins: [dts(), del({targets: 'dist/dts', hook: 'buildEnd'})],
  },
]
