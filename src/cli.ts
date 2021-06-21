#!/usr/bin/env node
import yargs from 'yargs';

import { replaceWithEnvConfig } from './replaceWithEnvConfig';

(async () => {
  try {
    const argv: any = await yargs(process.argv).alias("f", "file").argv;
    replaceWithEnvConfig(argv);
  } catch (error) {
    console.error(error.message);
    console.error(error);
    process.exit(1);
  }
})();
