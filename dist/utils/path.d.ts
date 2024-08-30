/**
 * Convert a string to camelCase.
 * @param str - The string to convert.
 * @returns The camelCase version of the string.
 */
export declare const toCamelCase: (str: string) => string;
/**
 * Convert a string to uppercase snake case and replace "-" with "_".
 * @param str - The string to convert.
 * @returns The uppercase snake case version of the string.
 */
export declare const toUpperSnakeCase: (str: string) => string;
/**
 * Extract the top-level key from a path and convert it to uppercase.
 * @param str - The path string.
 * @returns The top-level key in uppercase snake case.
 */
export declare const getTopLevelKey: (str: string) => string;
/**
 * Generate the function for dynamic paths if there are variables in the path.
 * @param path - The API path string.
 * @returns A function string that returns the constructed path.
 */
export declare const generatePathFunction: (path: string) => string;
