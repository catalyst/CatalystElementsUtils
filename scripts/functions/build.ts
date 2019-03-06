import del from 'del';
import nodeGlob from 'glob';
import { rollup, RollupOptions } from 'rollup';
import { promisify } from 'util';

import { getConfigs } from '../rollup.config';

// Promisified functions.
const glob = promisify(nodeGlob);

/**
 * Build everything.
 */
export async function build(): Promise<void> {
  await del(['lib']);

  // All ts files in src are entry points.
  const entrypoints = await glob('src/**/*.ts');
  await Promise.all(entrypoints.map(async (input) => buildRollup(getConfigs(input))));
}

/**
 * @param rollupConfig The rollup config file to use.
 * @returns the filenames output.
 */
async function buildRollup(
  rollupConfig: ReadonlyArray<RollupOptions>
): Promise<Array<string>> {
  const rollupBuilds = await Promise.all(rollupConfig.map(rollup));

  const buildOutputs = await Promise.all(
    rollupBuilds.map(async (rollupBuild, index) => {
      const config = rollupConfig[index];
      if (config.output === undefined) {
        return Promise.reject(new Error('output not defined'));
      }
      return rollupBuild.write(config.output);
    })
  );

  // Return an array of the filenames output.
  return buildOutputs.reduce((r0, b) => [...r0, ...b.output.reduce((r1, output) => [...r1, output.fileName], [])], []);
}
