# API Paths Generator

A TypeScript utility for generating strongly-typed API path functions from an OpenAPI YAML specification. This tool can be integrated as a devDependency in projects like Next.js, allowing developers to programmatically generate API paths and include them directly in their codebase.

## Features

- **Strong Typing:** Generates TypeScript functions with strong types based on your OpenAPI specification.
- **Modular Output:** Organizes generated paths into modular files, ensuring a clean and maintainable structure.
- **Customizable:** Allows users to specify custom input (OpenAPI YAML) and output directories.
- **Easy Integration:** Can be easily added as a devDependency in any TypeScript or Next.js project.

## Installation

### Install from GitHub

Since this package is distributed through GitHub, you can install it as a devDependency in your project directly from the GitHub repository:

```bash
npm install --save-dev github:maemreyo/openapi-paths-generator#v1.0.0

# or

yarn add --dev openapi-paths-generator@github:maemreyo/openapi-paths-generator#v1.0.0
```

Replace `v1.0.0` with the tag or branch you want to use.

### Local Installation

If you're developing or testing the package locally, you can install it using:

```bash
npm install ../path/to/openapi-paths-generator --save-dev
```

## Usage

You can use this package in both ESModule and CommonJS environments. Below are the examples for both.

### 1. Add a Script in Your Project

Create a script in your Next.js (or any TypeScript) project to invoke the generator. Place this script in a `scripts/` directory.

#### TypeScript (ESModule)

```typescript
// scripts/generateApiPaths.ts

import { generateApiPathsFromSpec } from 'openapi-paths-generator';

const openApiPath = './path/to/openapi.yaml'; // Adjust this path as needed
const outputDir = './src/api'; // Directory where API paths will be generated

generateApiPathsFromSpec({ openApiPath, outputDir });

console.log('API paths generated successfully.');
```

#### JavaScript (CommonJS)

```javascript
// scripts/generateApiPaths.js

const { resolve } = require('path');
const generateApiPathsFromSpec = require('openapi-paths-generator').default;

const run = () => {
  const openApiFilePath = resolve(__dirname, './openapi.yaml');
  const outputDirPath = resolve(__dirname, '../../_configs/');

  generateApiPathsFromSpec({
    openApiPath: openApiFilePath,
    outputDir: outputDirPath,
  });

  console.log('API paths generated successfully.');
};

run();
```

### 2. Run the Script

#### For TypeScript (ESModule)

You can run the TypeScript script using `ts-node`:

```bash
npx ts-node scripts/generateApiPaths.ts
```

Or use a custom npm script:

```json
{
  "scripts": {
    "generate-api-paths": "ts-node scripts/generateApiPaths.ts"
  }
}
```

Run the command:

```bash
npm run generate-api-paths
```

#### For JavaScript (CommonJS)

You can run the JavaScript script directly using Node.js:

```bash
node scripts/generateApiPaths.js
```

Or add a custom npm script:

```json
{
  "scripts": {
    "generate-api-paths": "node scripts/generateApiPaths.js"
  }
}
```

Then, run the command:

```bash
npm run generate-api-paths
```

### 3. Generated Files

The tool will generate TypeScript files in the specified output directory, structured as follows:

```plaintext
src/api/
├── moduleA.ts
├── moduleB.ts
└── index.ts
```

Each `module.ts` file contains path functions for the corresponding API module, and `index.ts` aggregates all the paths for easy import.

### 4. Using the Generated Paths

You can now import and use the generated paths in your project:

#### TypeScript (ESModule)

```typescript
import { API_PATHS } from './api';

const userDetailPath = API_PATHS.USER_DETAIL({ userId: '123' });

console.log(userDetailPath); // Outputs: /users/123
```

#### JavaScript (CommonJS)

```javascript
const { API_PATHS } = require('./api');

const userDetailPath = API_PATHS.USER_DETAIL({ userId: '123' });

console.log(userDetailPath); // Outputs: /users/123
```

## Development

### Building the Package

To compile the TypeScript code:

```bash
npm run build
```

### Using a Local Version

If you are developing or testing the package locally and need to link it to another project, you can use npm link:

```bash
# In the openapi-paths-generator directory
npm link

# In the project where you want to use it
npm link openapi-paths-generator
```

This allows you to use your local changes in your project without publishing them.

## Contributing

Feel free to submit issues and pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.