/**
 * Rollup Config.
 */

import { resolve as resolvePath } from 'path';
import { RollupOptions } from 'rollup';
import rollupPluginTypescript from 'rollup-plugin-typescript2';

const entryFileNamesPattern = '[name]';
const chuckFileNamePattern = 'common/[hash]';
const tsconfig = 'tsconfig.json';

const commonConfig = {
  output: {
    dir: 'lib',
    sourcemap: false
  },

  // All imports are considered external.
  external: () => true,

  treeshake: {
    pureExternalModules: true,
    propertyReadSideEffects: false,
    annotations: true
  }
};

export function getConfigs(input: string): Array<RollupOptions> {
  return [
    getConfigEsm(input),
    getConfigCjs(input)
  ];
}

function getConfigEsm(input: string): RollupOptions {
  return {
    ...commonConfig,

    input,

    output: {
      ...commonConfig.output,
      entryFileNames: `${entryFileNamesPattern}.mjs`,
      chunkFileNames: `${chuckFileNamePattern}.mjs`,
      format: 'esm'
    },

    plugins: [
      rollupPluginTypescript({
        tsconfig,
        tsconfigOverride: {
          compilerOptions: {
            declarationDir: resolvePath('lib')
          }
        },
        useTsconfigDeclarationDir: true
      })
    ]
  };
}

function getConfigCjs(input: string): RollupOptions {
  return {
    ...commonConfig,

    input,

    output: {
      ...commonConfig.output,
      entryFileNames: `${entryFileNamesPattern}.js`,
      chunkFileNames: `${chuckFileNamePattern}.js`,
      format: 'cjs'
    },

    plugins: [
      rollupPluginTypescript({
        tsconfig,
        tsconfigOverride: {
          compilerOptions: {
            declaration: false  // declarations are handled by jsConfigEsm.
          }
        }
      })
    ]
  };
}
