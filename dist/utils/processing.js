"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processModules = void 0;
const path_1 = __importDefault(require("path"));
const file_1 = require("./file");
const naming_1 = require("./naming");
const genModule_1 = require("../api/genModule");
const genIndex_1 = require("../api/genIndex");
const logging_1 = require("./logging");
/**
 * Processes and writes the module files.
 * @param moduleOutputDir - The directory where the module files will be written.
 * @param apiPaths - The generated API paths object, organized by modules.
 */
const processModules = (moduleOutputDir, apiPaths // Updated type here
) => {
    const modules = Object.keys(apiPaths);
    modules.forEach((module) => {
        logging_1.logger.info(`📝 Generating paths for module: ${module}`);
        const moduleContent = (0, genModule_1.createModuleFileContent)(module, apiPaths[module]);
        const moduleFilePath = path_1.default.join(moduleOutputDir, (0, naming_1.getModuleFileName)(module));
        (0, file_1.writeFile)(moduleFilePath, moduleContent);
        (0, logging_1.logFileCreation)(moduleFilePath);
    });
    // Generate and write the index file that aggregates all module paths
    logging_1.logger.info("🔗 Generating index file...");
    const indexContent = (0, genIndex_1.createIndexFileContent)(modules);
    const indexPath = path_1.default.join(moduleOutputDir, (0, naming_1.getIndexFileName)());
    (0, file_1.writeFile)(indexPath, indexContent);
    (0, logging_1.logFileCreation)(indexPath);
};
exports.processModules = processModules;
