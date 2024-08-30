/**
 * Creates the content for the index file that combines all module exports.
 *
 * This function generates a TypeScript file content string that imports all
 * module-specific path exports and aggregates them into a single `API_PATHS`
 * object. This file serves as the central index for accessing all API paths
 * defined across different modules.
 *
 * @param modules - The list of module names. Each module name should match the
 *                  corresponding file and export names.
 * @returns The complete content string for the index file.
 */
export declare const createIndexFileContent: (modules: string[]) => string;
//# sourceMappingURL=genIndex.d.ts.map