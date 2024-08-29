/**
 * Create the content for the index file that combines all modules.
 * @param modules - The list of module names.
 * @returns The content string for the index file.
 */
export const createIndexFileContent = (modules: string[]): string => {
  const imports = modules
    .map(
      (module) =>
        `import { ${module}_PATHS } from './${module.toLowerCase()}Paths';`
    )
    .join("\n");
  const exports = modules.map((module) => `  ...${module}_PATHS,`).join("\n");

  return `
// ===========================================
// Auto-generated file from OpenAPI spec
// ===========================================
//
// To regenerate this file, please follow these steps:
//   1. Contact the BE Team to get the latest "openapi.yaml" file
//   2. Place the file in the directory: "scripts/api/openapi.yaml"
//   3. Run the following command to regenerate API paths:
//
// >>>>>>> yarn generate-api-paths
//
// or
//
// >>>>>>> npm run generate-api-paths
//

${imports}

export const API_PATHS = {
${exports}
} as const;
`;
};
