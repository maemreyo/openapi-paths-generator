"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApiPathsFromSpec = void 0;
const path_1 = __importDefault(require("path"));
const file_1 = require("./utils/file");
const paths_1 = require("./config/paths");
const genPaths_1 = require("./api/genPaths");
const genModule_1 = require("./api/genModule");
const genIndex_1 = require("./api/genIndex");
/**
 * Generate API paths based on an OpenAPI spec file.
 * @param openApiPath - Path to the OpenAPI YAML file.
 * @param outputDir - Path to the output directory.
 */
const generateApiPathsFromSpec = (openApiPath, outputDir) => {
    // Ensure the output directory exists
    (0, file_1.ensureDirectoryExists)(outputDir);
    const pathsConfig = (0, paths_1.resolvePaths)(openApiPath, outputDir);
    console.log("===================================================");
    console.log("🚀 Starting API Paths generation...");
    console.log("===================================================\n");
    // Ensure the module-specific output directory exists
    const moduleOutputDir = path_1.default.join(outputDir, "apiPaths");
    (0, file_1.ensureDirectoryExists)(moduleOutputDir);
    // Read and parse the OpenAPI YAML file
    const openApiDoc = (0, file_1.readYamlFile)(pathsConfig.openApiFilePath);
    // Generate the API paths
    const apiPaths = (0, genPaths_1.generateApiPaths)(openApiDoc.paths);
    const modules = Object.keys(apiPaths);
    // Generate files for each module
    modules.forEach((module) => {
        console.log(`📝 Generating paths for module: ${module}`);
        const moduleContent = (0, genModule_1.createModuleFileContent)(module, apiPaths[module]);
        const moduleFilePath = path_1.default.join(moduleOutputDir, `${module.toLowerCase()}.ts` // Removed "Paths" from the filename
        );
        (0, file_1.writeFile)(moduleFilePath, moduleContent);
        console.log(`✅ Module file created: ${moduleFilePath}`);
        console.log("===================================================\n");
    });
    // Generate the index file that aggregates all module paths
    console.log("🔗 Generating index file...");
    const indexContent = (0, genIndex_1.createIndexFileContent)(modules);
    const indexPath = path_1.default.join(moduleOutputDir, "index.ts");
    (0, file_1.writeFile)(indexPath, indexContent);
    console.log(`✅ Index file created: ${indexPath}`);
    console.log("===================================================\n");
    console.log("🎉 API Paths generation completed successfully!");
};
exports.generateApiPathsFromSpec = generateApiPathsFromSpec;
