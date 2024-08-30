"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApiPathsFromSpec = void 0;
const file_1 = require("./utils/file");
const paths_1 = require("./config/paths");
const genPaths_1 = require("./api/genPaths");
const logging_1 = require("./utils/logging");
const output_1 = require("./utils/output");
const processing_1 = require("./utils/processing");
/**
 * Generate API paths based on an OpenAPI spec file.
 * @param options - The options object containing all necessary parameters.
 */
const generateApiPathsFromSpec = (options) => {
    try {
        const { openApiPath, outputDir, customName } = options;
        (0, logging_1.logStart)();
        // Prepare the output directory
        const moduleOutputDir = (0, output_1.prepareOutputDirectory)(outputDir, customName);
        // Resolve the paths configuration
        const pathsConfig = (0, paths_1.resolvePaths)(openApiPath, outputDir);
        // Read and parse the OpenAPI YAML file
        const openApiDoc = (0, file_1.readYamlFile)(pathsConfig.openApiFilePath);
        // Generate the API paths and process the modules
        const apiPaths = (0, genPaths_1.generateApiPaths)(openApiDoc.paths);
        (0, processing_1.processModules)(moduleOutputDir, apiPaths);
        (0, logging_1.logCompletion)();
    }
    catch (error) {
        console.error("❌ An error occurred during the API paths generation process:", error);
    }
};
exports.generateApiPathsFromSpec = generateApiPathsFromSpec;
(0, exports.generateApiPathsFromSpec)({
    openApiPath: "./mocks/openapi.yaml",
    outputDir: "./mocks",
    customName: "duyhoang",
});
