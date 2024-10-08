"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIndexFileContent = void 0;
const constants_1 = require("../constants");
const naming_1 = require("../utils/naming");
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
const createIndexFileContent = (modules) => {
    // Generate import statements for each module
    const imports = modules
        .map((module) => `import { ${module.toUpperCase()}_PATHS } from './${(0, naming_1.getModuleFileName)(module)}';`)
        .join("\n");
    // Aggregate all module exports into the API_PATHS object
    const exports = modules
        .map((module) => `  ...${module.toUpperCase()}_PATHS,`)
        .join("\n");
    // Return the final content for the index file, including the auto-generated header comment
    return `
${constants_1.FILE_HEADER_COMMENT}

${imports}

export const API_PATHS = {
${exports}
} as const;
`;
};
exports.createIndexFileContent = createIndexFileContent;
