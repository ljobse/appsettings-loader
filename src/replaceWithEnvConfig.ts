import * as fs from 'fs';
import { parse } from 'yaml';

import { applyEnvConfig } from '.';

export const replaceWithEnvConfig = (argv: { file: string; yml: string }) => {
  const file = argv.file;
  const yamlFile = argv.yml;
  let env = process.env;
  if (!file) {
    throw new Error('file should be specified');
  }

  if (!fs.existsSync(file)) {
    throw new Error('file not found');
  }

  if (yamlFile) {
    if (!fs.existsSync(yamlFile)) {
      throw new Error('yaml file not found');
    }
    const yamlEnv = parse(fs.readFileSync(yamlFile).toString());
    env = { ...yamlEnv, ...env };
  }

  const settings = applyEnvConfig(JSON.parse(fs.readFileSync(file).toString()), env);
  fs.writeFileSync(file, JSON.stringify(settings));
};
