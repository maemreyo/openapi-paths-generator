/**
 * Create the content for individual module files.
 * @param moduleName - The name of the module.
 * @param apiPaths - The API paths object.
 * @returns The content string for the module file.
 */
export const createModuleFileContent = (
  moduleName: string,
  apiPaths: Record<string, string>
): string => {
  const convertToString = (obj: Record<string, string>, indent = 2): string => {
    return Object.entries(obj)
      .map(([key, value]) => `${" ".repeat(indent)}${key}: ${value},`)
      .join("\n");
  };

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

export const ${moduleName}_PATHS = {
${convertToString(apiPaths)}
} as const;
`;
};
