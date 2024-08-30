"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModuleFileContent = void 0;
const constants_1 = require("../constants");
/**
 * Generates the content for a module file that exports API path constants.
 *
 * This function takes a module name and a set of API paths and generates a
 * TypeScript module file content. The module file will export a constant object
 * named after the module, suffixed with `_PATHS`, containing all the API paths
 * defined in the provided `apiPaths` object.
 *
 * The generated file content includes a header comment (from `FILE_HEADER_COMMENT`)
 * that indicates the file is auto-generated, and provides instructions for
 * regenerating the file if needed.
 *
 * @param moduleName - The name of the module. This name will be used to create
 *                     the export constant name (e.g., `USER_PATHS` for a module
 *                     named "user").
 * @param apiPaths - An object where each key is a path name and the corresponding
 *                   value is a string representing the path or a function that
 *                   generates a dynamic path.
 * @returns A string representing the complete content of the module file.
 *
 * @example
 * const moduleName = "user";
 * const apiPaths = {
 *   GET_USER: "`/user/${userId}`",
 *   CREATE_USER: "`/user`"
 * };
 *
 * const content = createModuleFileContent(moduleName, apiPaths);
 * logger.info(content);
 *
 * // Output:
 * // // ===========================================
 * // // Auto-generated file from OpenAPI Specification
 * // // ===========================================
 * // //
 * // // ...
 * // export const USER_PATHS = {
 * //   GET_USER: "`/user/${userId}`",
 * //   CREATE_USER: "`/user`",
 * // } as const;
 */
const createModuleFileContent = (moduleName, apiPaths) => {
    /**
     * Converts the apiPaths object into a formatted string suitable for
     * inclusion in the generated module file. Each key-value pair in the
     * object is converted into a corresponding line of TypeScript code.
     *
     * @param obj - The object containing API paths.
     * @param indent - The number of spaces to use for indentation.
     * @returns A string where each line represents an API path declaration.
     */
    const convertToString = (obj, indent = 2) => {
        return Object.entries(obj)
            .map(([key, value]) => {
            return `${" ".repeat(indent)}${key}: ${value},`;
        })
            .join("\n");
    };
    return `
${constants_1.FILE_HEADER_COMMENT}

export const ${moduleName.toUpperCase()}_PATHS = {
${convertToString(apiPaths)}
} as const;
`;
};
exports.createModuleFileContent = createModuleFileContent;
