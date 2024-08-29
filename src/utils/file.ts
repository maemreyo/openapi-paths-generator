import fs from "fs";

/**
 * Reads and parses a YAML file.
 * @param filePath - Path to the YAML file.
 * @returns The parsed YAML content as an object.
 */
export const readYamlFile = <T>(filePath: string): T => {
  const content = fs.readFileSync(filePath, "utf8");
  return JSON.parse(content) as T;
};

/**
 * Ensures the given directory exists; if not, creates it.
 * @param dirPath - Path to the directory.
 */
export const ensureDirectoryExists = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Writes content to a file.
 * @param filePath - Path to the file.
 * @param content - The content to write to the file.
 */
export const writeFile = (filePath: string, content: string): void => {
  fs.writeFileSync(filePath, content);
};
