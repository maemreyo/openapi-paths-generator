/**
 * Generates a module file name with an underscore prefix and the appropriate extension.
 * @param moduleName - The name of the module.
 * @returns The file name string.
 */
export const getModuleFileName = (moduleName: string): string => {
  return `_${moduleName.toLowerCase()}.ts`;
};

/**
 * Generates the index file name.
 * @returns The file name string for the index file.
 */
export const getIndexFileName = (): string => {
  return "index.ts";
};
