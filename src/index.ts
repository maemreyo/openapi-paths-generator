import { readYamlFile } from "./utils/file";
import { PathsConfig, resolvePaths } from "./config/paths";
import { generateApiPaths } from "./api/genPaths";
import { logStart, logCompletion } from "./utils/logging";
import { prepareOutputDirectory } from "./utils/output";
import { processModules } from "./utils/processing";

export interface GenerateApiPathsOptions {
  openApiPath: string; // Path to the OpenAPI YAML file
  outputDir: string; // Path to the output directory
  customName?: string; // Optional custom name for the apiPaths directory
}

export interface OpenApiDoc {
  paths: Record<string, unknown>;
}

/**
 * Generate API paths based on an OpenAPI spec file.
 * @param options - The options object containing all necessary parameters.
 */
const generateApiPathsFromSpec = (options: GenerateApiPathsOptions): void => {
  try {
    const { openApiPath, outputDir, customName } = options;

    logStart();

    // Prepare the output directory
    const moduleOutputDir = prepareOutputDirectory(outputDir, customName);

    // Resolve the paths configuration
    const pathsConfig: PathsConfig = resolvePaths(openApiPath, outputDir);

    // Read and parse the OpenAPI YAML file
    const openApiDoc: OpenApiDoc = readYamlFile<OpenApiDoc>(
      pathsConfig.openApiFilePath
    );

    // Generate the API paths and process the modules
    const apiPaths = generateApiPaths(
      openApiDoc.paths as Record<string, unknown>
    );
    processModules(moduleOutputDir, apiPaths);

    logCompletion();
  } catch (error) {
    console.error(
      "❌ An error occurred during the API paths generation process:",
      error
    );
  }
};

export default generateApiPathsFromSpec;
