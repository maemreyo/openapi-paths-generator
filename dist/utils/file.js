import fs from "fs";
import yaml from "js-yaml";
/**
 * Reads and parses a YAML file.
 * @param filePath - The path to the YAML file.
 * @returns The parsed YAML content as a JavaScript object.
 */
export const readYamlFile = (filePath) => {
    const content = fs.readFileSync(filePath, "utf8");
    // Parse the YAML content using js-yaml
    return yaml.load(content);
};
/**
 * Ensures that the specified directory exists, creating it if necessary.
 * @param dirPath - The directory path.
 */
export const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};
/**
 * Writes content to a file.
 * @param filePath - The path to the file.
 * @param content - The content to write to the file.
 */
export const writeFile = (filePath, content) => {
    fs.writeFileSync(filePath, content, "utf8");
};
