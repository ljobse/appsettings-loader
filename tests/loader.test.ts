import { expect } from 'chai';
import * as fs from 'fs';

import { applyEnvConfig } from '../src/applyEnvConfig';
import { replaceWithEnvConfig } from '../src/replaceWithEnvConfig';
import settings from './test.json';

describe("Loader test", () => {
  it("Should replace value", async () => {
    process.env["test"] = "123";
    process.env["nestedRoot.nestedChild.VALBOOL"] = "false";
    process.env["nestedRoot.nestedChild.valnumber"] = "999";
    process.env["nestedRoot.nestedChild.valText"] = "new text";
    const newSettings = applyEnvConfig(settings);
    expect(123).equal(newSettings.test);
    expect(false).equal(newSettings.nestedRoot.nestedChild.valBool);
    expect(999).equal(newSettings.nestedRoot.nestedChild.valNumber);
    expect("new text").equal(newSettings.nestedRoot.nestedChild.valText);
  });

  it("Should replace file by cli", async () => {
    const filePath = `${__dirname}/test2.json`;
    process.env["nestedRoot.nestedChild.valnumber"] = "999";
    const oldSettings = fs.readFileSync(filePath).toString();
    replaceWithEnvConfig({ file: filePath });
    const newSettings = JSON.parse(fs.readFileSync(filePath).toString());
    await new Promise((res) => setTimeout(res, 20));

    expect(999).equal(newSettings.nestedRoot.nestedChild.valNumber);
    expect("left").equal(newSettings.unchanged);

    fs.writeFileSync(filePath, oldSettings);
  });
});
