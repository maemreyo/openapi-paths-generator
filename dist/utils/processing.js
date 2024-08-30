"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processModules = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const crypto_1 = __importDefault(require("crypto"));
const file_1 = require("./file");
const naming_1 = require("./naming");
const genModule_1 = require("../api/genModule");
const genIndex_1 = require("../api/genIndex");
const logging_1 = require("./logging");
/**
 * Generates a hash for a given content.
 * @param content - The content to hash.
 * @returns The generated hash as a string.
 */
const getHash = (content) => {
    return crypto_1.default.createHash("md5").update(content).digest("hex");
};
/**
 * Determines if the file should be regenerated based on content hash comparison.
 * @param filePath - The path to the file.
 * @param content - The new content to compare.
 * @returns A boolean indicating whether the file should be regenerated.
 */
const shouldRegenerateFile = async (filePath, content) => {
    try {
        await fs_1.promises.access(filePath);
        const existingContent = await fs_1.promises.readFile(filePath, "utf8");
        return getHash(existingContent) !== getHash(content);
    }
    catch (err) {
        // If the file doesn't exist, it should be regenerated
        return true;
    }
};
/**
 * Ensures that the directory for the given file path exists.
 * @param filePath - The path to the file.
 */
const ensureDirectoryExists = async (filePath) => {
    const dir = path_1.default.dirname(filePath);
    await fs_1.promises.mkdir(dir, { recursive: true });
};
/**
 * Processes and writes the module files in parallel with incremental updates.
 * @param moduleOutputDir - The directory where the module files will be written.
 * @param apiPaths - The generated API paths object, organized by modules.
 */
const processModules = async (moduleOutputDir, apiPaths) => {
    const modules = Object.keys(apiPaths);
    // Process each module in parallel
    await Promise.all(modules.map(async (module) => {
        logging_1.logger.info(`📝 Generating paths for module: ${module}`);
        const moduleContent = (0, genModule_1.createModuleFileContent)(module, apiPaths[module]);
        const moduleFilePath = path_1.default.join(moduleOutputDir, (0, naming_1.getModuleFileName)(module));
        // Ensure the directory exists before writing the file
        await ensureDirectoryExists(moduleFilePath);
        // Check if the file should be regenerated
        if (await shouldRegenerateFile(moduleFilePath, moduleContent)) {
            await (0, file_1.writeFile)(moduleFilePath, moduleContent);
            (0, logging_1.logFileCreation)(moduleFilePath);
        }
        else {
            logging_1.logger.info(`⏩ Skipping unchanged module file: ${moduleFilePath}`);
        }
    }));
    // Generate and write the index file that aggregates all module paths
    logging_1.logger.info("🔗 Generating index file...");
    const indexContent = (0, genIndex_1.createIndexFileContent)(modules);
    const indexPath = path_1.default.join(moduleOutputDir, (0, naming_1.getIndexFileName)());
    // Ensure the directory exists before writing the file
    await ensureDirectoryExists(indexPath);
    if (await shouldRegenerateFile(indexPath, indexContent)) {
        await (0, file_1.writeFile)(indexPath, indexContent);
        (0, logging_1.logFileCreation)(indexPath);
    }
    else {
        logging_1.logger.info(`⏩ Skipping unchanged index file: ${indexPath}`);
    }
};
exports.processModules = processModules;
