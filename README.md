# API Paths Generator

A TypeScript utility for generating strongly-typed API path functions from an OpenAPI YAML specification. This tool can be integrated as a devDependency in projects like Next.js, allowing developers to programmatically generate API paths and include them directly in their codebase.

## Features

- **Strong Typing:** Generates TypeScript functions with strong types based on your OpenAPI specification.
- **Modular Output:** Organizes generated paths into modular files, ensuring a clean and maintainable structure.
- **Customizable:** Allows users to specify custom input (OpenAPI YAML) and output directories.
- **Easy Integration:** Can be easily added as a devDependency in any TypeScript or Next.js project.

## Installation

### Via npm

If you’ve published the package on npm:

```bash
npm install my-api-paths-generator --save-dev
```

### Local Installation

If you're using this package locally:

```bash
npm install ../path/to/my-api-paths-generator --save-dev
```

## Usage

### 1. Add a Script in Your Project

Create a script in your Next.js (or any TypeScript) project to invoke the generator. Place this script in a `scripts/` directory.

```typescript
// scripts/generateApiPaths.ts

import { generateApiPathsFromSpec } from 'my-api-paths-generator';

const openApiPath = './path/to/openapi.yaml'; // Adjust this path as needed
const outputDir = './src/api'; // Directory where API paths will be generated

generateApiPathsFromSpec(openApiPath, outputDir);

console.log('API paths generated successfully.');
```

### 2. Run the Script

You can run this script using `ts-node`:

```bash
npx ts-node scripts/generateApiPaths.ts
```

Alternatively, you can add a custom npm script in your `package.json` to simplify the process:

```json
{
  "scripts": {
    "generate-api-paths": "ts-node scripts/generateApiPaths.ts"
  }
}
```

Then, you can run the command:

```bash
npm run generate-api-paths
```

### 3. Generated Files

The tool will generate TypeScript files in the specified output directory, structured as follows:

```plaintext
src/api/
├── moduleAPaths.ts
├── moduleBPaths.ts
└── index.ts
```

Each `modulePaths.ts` file contains path functions for the corresponding API module, and `index.ts` aggregates all the paths for easy import.

### 4. Using the Generated Paths

You can now import and use the generated paths in your project:

```typescript
import { API_PATHS } from './api';

const userDetailPath = API_PATHS.USER_DETAIL({ userId: '123' });

console.log(userDetailPath); // Outputs: /users/123
```

## Development

### Building the Package

To compile the TypeScript code:

```bash
npm run build
```

### Publishing

If you intend to publish this package to npm, make sure to bump the version in `package.json` and then publish:

```bash
npm publish
```

## Contributing

Feel free to submit issues and pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
