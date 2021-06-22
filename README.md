# Appsettings json config loader

## A simple tool to load config data

This allows you to automatically map environment variables typed into your application.

- By overwriting the saved file during the build (CLI, intended for Frontend applications)
- By setting the values at runtime (import, intended for Backend applications)

## Install

```bash
# with npm
npm install @ljobse/appsettings-loader

# or with Yarn
yarn add @ljobse/appsettings-loader
```

# CLI

The CLI allows you to overwrite properties in the json file from the current process.env context.

```bash
$ appsettings-loader ./config/appsettings.json
```

# Lib

The library allows you to load the current process.env variables into an imported js(on) object.

```javascript
var newSettings = applyEnvConfig(require("./config/appsettings.json"));
```

- Nesting is supported by dot separation.
- Types are inherited
- Case insensitive

### Real world example

Environment on cloud provider or locally is set with the variables you need to load into your application.

```dosini
#process.env

DATABASENAME=server_db
```

```json
//# src/config/appsettings.json
{
  "databaseName": "postgres"
}
```

```typescript
//# src/config/index.ts

import { applyEnvConfig } from "@ljobse/appsettings-loader";
import appsettings from "./appsettings.json";

const config = applyEnvConfig(appsettings);

export { config };
```

```typescript
//# src/app.ts

import { config } from "./config";

console.log(config.databaseName);
// => "server_db"
```
