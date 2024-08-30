import { FILE_HEADER_COMMENT } from "../constants";
import { getModuleFileName } from "../utils/naming";
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
export const createIndexFileContent = (modules) => {
    // Generate import statements for each module
    const imports = modules
        .map((module) => `import { ${module.toUpperCase()}_PATHS } from './${getModuleFileName(module)}';`)
        .join("\n");
    // Aggregate all module exports into the API_PATHS object
    const exports = modules
        .map((module) => `  ...${module.toUpperCase()}_PATHS,`)
        .join("\n");
    // Return the final content for the index file, including the auto-generated header comment
    return `
${FILE_HEADER_COMMENT}

${imports}

export const API_PATHS = {
${exports}
} as const;
`;
};
