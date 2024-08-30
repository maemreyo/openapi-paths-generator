"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareOutputDirectory = void 0;
const path_1 = __importDefault(require("path"));
const file_1 = require("./file");
const versioning_1 = require("./versioning");
const logging_1 = require("./logging");
/**
 * Handles the preparation of the output directory.
 * @param outputDir - The base output directory.
 * @param customName - Optional custom name for the apiPaths directory.
 * @returns The path to the module output directory.
 */
const prepareOutputDirectory = (outputDir, customName) => {
    (0, file_1.ensureDirectoryExists)(outputDir);
    const baseName = customName ? `apiPaths_${customName}` : "apiPaths";
    const moduleOutputDir = path_1.default.join(outputDir, (0, versioning_1.getNextVersionedDir)(outputDir, baseName));
    (0, file_1.ensureDirectoryExists)(moduleOutputDir);
    logging_1.logger.info(`📂 Output directory set to: ${moduleOutputDir}`);
    logging_1.logger.info("===================================================\n");
    return moduleOutputDir;
};
exports.prepareOutputDirectory = prepareOutputDirectory;
