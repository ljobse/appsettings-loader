import * as fs from 'fs';

import { applyEnvConfig } from '.';

export const replaceWithEnvConfig = (argv: { file: string }) => {
  const file = argv.file;
  if (!file) {
    throw new Error("file should be specified");
  }

  if (!fs.existsSync(file)) {
    throw new Error("file not found");
  }

  const settings = applyEnvConfig(JSON.parse(fs.readFileSync(file).toString()));
  fs.writeFileSync(file, JSON.stringify(settings));
};
