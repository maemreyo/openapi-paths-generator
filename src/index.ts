import { readYamlFile } from "./utils/file";
import { resolvePaths } from "./config/paths";
import { generateApiPaths } from "./api/genPaths";
import { PathsConfig, OpenApiDoc, GenerateApiPathsOptions } from "./types";
import { logStart, logCompletion } from "./utils/logging";
import { prepareOutputDirectory } from "./utils/output";
import { processModules } from "./utils/processing";

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
