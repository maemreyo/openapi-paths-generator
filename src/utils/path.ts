/**
 * Convert a string to camelCase.
 * @param str - The string to convert.
 * @returns The camelCase version of the string.
 */
export const toCamelCase = (str: string): string => {
  return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase());
};

/**
 * Convert a string to uppercase snake case and replace "-" with "_".
 * @param str - The string to convert.
 * @returns The uppercase snake case version of the string.
 */
export const toUpperSnakeCase = (str: string): string => {
  return str
    .replace(/[-\/|{|}]/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .toUpperCase();
};

/**
 * Extract the top-level key from a path and convert it to uppercase.
 * @param str - The path string.
 * @returns The top-level key in uppercase snake case.
 */
export const getTopLevelKey = (str: string): string => {
  return toUpperSnakeCase(str.split("/").filter(Boolean)[0] || "");
};

/**
 * Generate the function for dynamic paths if there are variables in the path.
 * @param path - The API path string.
 * @returns A function string that returns the constructed path.
 */
export const generatePathFunction = (path: string): string => {
  const variables = path.match(/{(.*?)}/g);
  if (variables) {
    const params = variables.map((v) => toCamelCase(v.replace(/[{}]/g, "")));
    const paramStr = params.map((p) => `${p}: string`).join(", ");
    const replacedPath = path.replace(
      /{(.*?)}/g,
      (_, match) => `\${${toCamelCase(match)}}`
    );
    return `(${paramStr}) => \`${replacedPath}\``;
  }
  return `\`${path}\``;
};
