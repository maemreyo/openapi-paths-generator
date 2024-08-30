"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.ensureDirectoryExists = exports.readYamlFile = void 0;
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
/**
 * Reads and parses a YAML file.
 * @param filePath - The path to the YAML file.
 * @returns The parsed YAML content as a JavaScript object.
 */
const readYamlFile = (filePath) => {
    const content = fs_1.default.readFileSync(filePath, "utf8");
    // Parse the YAML content using js-yaml
    return js_yaml_1.default.load(content);
};
exports.readYamlFile = readYamlFile;
/**
 * Ensures that the specified directory exists, creating it if necessary.
 * @param dirPath - The directory path.
 */
const ensureDirectoryExists = (dirPath) => {
    if (!fs_1.default.existsSync(dirPath)) {
        fs_1.default.mkdirSync(dirPath, { recursive: true });
    }
};
exports.ensureDirectoryExists = ensureDirectoryExists;
/**
 * Writes content to a file.
 * @param filePath - The path to the file.
 * @param content - The content to write to the file.
 */
const writeFile = (filePath, content) => {
    fs_1.default.writeFileSync(filePath, content, "utf8");
};
exports.writeFile = writeFile;
