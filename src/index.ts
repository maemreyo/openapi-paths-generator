import path from "path";
import { ensureDirectoryExists, writeFile, readYamlFile } from "./utils/file";
import { getNextVersionedDir } from "./utils/versioning";
import { getModuleFileName, getIndexFileName } from "./utils/naming";
import { resolvePaths } from "./config/paths";
import { generateApiPaths } from "./api/genPaths";
import { createModuleFileContent } from "./api/genModule";
import { createIndexFileContent } from "./api/genIndex";
import { PathsConfig, OpenApiDoc, GenerateApiPathsOptions } from "./types";

/**
 * Generate API paths based on an OpenAPI spec file.
 * @param options - The options object containing all necessary parameters.
 */
export const generateApiPathsFromSpec = (
  options: GenerateApiPathsOptions
): void => {
  const { openApiPath, outputDir, customName } = options;

  // Ensure the output directory exists
  ensureDirectoryExists(outputDir);

  const pathsConfig: PathsConfig = resolvePaths(openApiPath, outputDir);

  console.log("===================================================");
  console.log("🚀 Starting API Paths generation...");
  console.log("===================================================\n");

  // Determine the base directory name
  const baseName = customName ? `apiPaths_${customName}` : "apiPaths";

  // Get the next available versioned directory name
  const moduleOutputDir = path.join(
    outputDir,
    getNextVersionedDir(outputDir, baseName)
  );
  ensureDirectoryExists(moduleOutputDir);

  console.log(`📂 Output directory is set to: ${moduleOutputDir}`);
  console.log("===================================================\n");

  // Read and parse the OpenAPI YAML file
  const openApiDoc: OpenApiDoc = readYamlFile<OpenApiDoc>(
    pathsConfig.openApiFilePath
  );

  // Generate the API paths
  const apiPaths = generateApiPaths(
    openApiDoc.paths as Record<string, unknown>
  );
  const modules = Object.keys(apiPaths);

  // Generate files for each module using the centralized naming function
  modules.forEach((module) => {
    console.log(`📝 Generating paths for module: ${module}`);
    const moduleContent = createModuleFileContent(module, apiPaths[module]);
    const moduleFilePath = path.join(
      moduleOutputDir,
      getModuleFileName(module)
    );
    writeFile(moduleFilePath, moduleContent);
    console.log(`✅ Module file created: ${moduleFilePath}`);
    console.log("===================================================\n");
  });

  // Generate the index file that aggregates all module paths (without the underscore)
  console.log("🔗 Generating index file...");
  const indexContent = createIndexFileContent(modules);
  const indexPath = path.join(moduleOutputDir, getIndexFileName()); // Use centralized naming
  writeFile(indexPath, indexContent);
  console.log(`✅ Index file created: ${indexPath}`);
  console.log("===================================================\n");

  console.log("🎉 API Paths generation completed successfully!");
};


generateApiPathsFromSpec({
  openApiPath: "./mocks/openapi.yaml",
  outputDir: "./mocks",
  customName: "duyhoang",
});



