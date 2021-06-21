# Appsettings json config loader

## Very simple tool to load config data

This allows you to automatically map environment variables typed into your application.

- By overwriting the saved file during the build (CLI, intended for Frontend applications)
- By setting the values at runtime (import, intended for Backend applications)

# CLI

The CLI allows you to overwrite properties in the json file from the current process.env context.

```
~$ appsettings-loader ./config/appsettings.json
```

# Lib

The library allows you to load the current process.env variables into an imported js(on) object.

```
const newSettings = applyEnvConfig(require('./config/appsettings.json'));
```

- Nesting is supported by dot separation.
- Types are inherited
