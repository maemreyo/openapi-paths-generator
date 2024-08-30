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
export declare const createModuleFileContent: (moduleName: string, apiPaths: Record<string, string>) => string;
//# sourceMappingURL=genModule.d.ts.map