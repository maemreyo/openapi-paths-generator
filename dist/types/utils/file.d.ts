/**
 * Reads and parses a YAML file.
 * @param filePath - The path to the YAML file.
 * @returns The parsed YAML content as a JavaScript object.
 */
export declare const readYamlFile: <T>(filePath: string) => T;
/**
 * Ensures that the specified directory exists, creating it if necessary.
 * @param dirPath - The directory path.
 */
export declare const ensureDirectoryExists: (dirPath: string) => void;
/**
 * Writes content to a file.
 * @param filePath - The path to the file.
 * @param content - The content to write to the file.
 */
export declare const writeFile: (filePath: string, content: string) => void;
//# sourceMappingURL=file.d.ts.map