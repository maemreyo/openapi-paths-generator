"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePathFunction = exports.getTopLevelKey = exports.toUpperSnakeCase = exports.toCamelCase = void 0;
/**
 * Convert a string to camelCase.
 * @param str - The string to convert.
 * @returns The camelCase version of the string.
 */
const toCamelCase = (str) => {
    return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase());
};
exports.toCamelCase = toCamelCase;
/**
 * Convert a string to uppercase snake case and replace "-" with "_".
 * @param str - The string to convert.
 * @returns The uppercase snake case version of the string.
 */
const toUpperSnakeCase = (str) => {
    return str
        .replace(/[-\/|{|}]/g, "_")
        .replace(/^_+|_+$/g, "")
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .toUpperCase();
};
exports.toUpperSnakeCase = toUpperSnakeCase;
/**
 * Extract the top-level key from a path and convert it to uppercase.
 * @param str - The path string.
 * @returns The top-level key in uppercase snake case.
 */
const getTopLevelKey = (str) => {
    return (0, exports.toUpperSnakeCase)(str.split("/").filter(Boolean)[0] || "");
};
exports.getTopLevelKey = getTopLevelKey;
/**
 * Generate the function for dynamic paths if there are variables in the path.
 * @param path - The API path string.
 * @returns A function string that returns the constructed path.
 */
const generatePathFunction = (path) => {
    const variables = path.match(/{(.*?)}/g);
    if (variables) {
        const params = variables.map((v) => (0, exports.toCamelCase)(v.replace(/[{}]/g, "")));
        const paramStr = params.map((p) => `${p}: string`).join(", ");
        const replacedPath = path.replace(/{(.*?)}/g, (_, match) => `\${${(0, exports.toCamelCase)(match)}}`);
        return `(${paramStr}) => \`${replacedPath}\``;
    }
    return `\`${path}\``;
};
exports.generatePathFunction = generatePathFunction;
