const flattenObject = (obj: any, prefix = "") =>
  Object.keys(obj).reduce((acc: any, k) => {
    const pre = prefix.length ? prefix + "." : "";
    if (Array.isArray(obj[k])) {
      acc[pre + k] = obj[k] as any;
    } else if (typeof obj[k] === "object")
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k] as any;
    return acc;
  }, {});

const unflatten = (data: any) => {
  var result: any = {};
  for (var i in data) {
    var keys = i.split(".");
    keys.reduce(
      (res: any, key: any, j) =>
        res[key] ||
        (res[key] = isNaN(Number(keys[j + 1]))
          ? keys.length - 1 === j
            ? data[i]
            : {}
          : []),
      result
    );
  }
  return result;
};

/**
 * Function to apply the environment variables onto your config object.
 * Matches the keys of the envVars with the config case insensitive, omits underscores `_` and matches nested objects in the config with dot separated keys in the envVars.
 * When dot notation in env is not available this can be done by a double underscore `__`.
 *
 * @param appSettings Imported json settings. A typed object with default or placeholder values
 * @param envVars Optional param to provide a custom list of environment variables. `process.env` by default.
 * @returns An object of the same type as the appSettings param where the values are replaced with the matching values of envVars.
 */
export const applyEnvConfig = <TConfig = { [key: string]: any }>(
  appSettings: TConfig,
  envVars: { [key: string]: string } = process.env
): TConfig => {
  const flattenedSettings = flattenObject(appSettings);

  const env = Object.keys(envVars).reduce((res, itemKey) => {
    res[
      itemKey
        .toLowerCase()
        .replace(new RegExp(`__`, "g"), ".")
        .replace(new RegExp(`_`, "g"), "")
        .trim()
    ] = envVars[itemKey];

    return res;
  }, {} as any);

  Object.keys(flattenedSettings).forEach((key) => {
    const envKey = key
      .toLowerCase()
      .replace(new RegExp(`__`, "g"), ".")
      .replace(new RegExp(`_`, "g"), "")
      .trim();
    if (!(envKey in env)) return;

    const oldValue = flattenedSettings[key];
    const oldCtor = (oldValue as any).constructor;
    const newValue = env[envKey];

    flattenedSettings[key] =
      typeof oldValue === "boolean"
        ? oldCtor(newValue) &&
          newValue.toString().toLowerCase() === true.toString()
        : typeof oldValue === "object"
        ? JSON.parse(newValue)
        : oldCtor(newValue);
  });

  const newSettings = unflatten(flattenedSettings);
  return newSettings;
};
