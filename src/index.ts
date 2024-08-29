import path from "path";
import { ensureDirectoryExists, writeFile, readYamlFile } from "./utils/file";
import { resolvePaths } from "./config/paths";
import { generateApiPaths } from "./api/genPaths";
import { createModuleFileContent } from "./api/genModule";
import { createIndexFileContent } from "./api/genIndex";
import { PathsConfig, OpenApiDoc } from "./types";

/**
 * Generate API paths based on an OpenAPI spec file.
 * @param openApiPath - Path to the OpenAPI YAML file.
 * @param outputDir - Path to the output directory.
 */
export const generateApiPathsFromSpec = (
  openApiPath: string,
  outputDir: string
): void => {
  const pathsConfig: PathsConfig = resolvePaths(openApiPath, outputDir);

  console.log("===================================================");
  console.log("🚀 Starting API Paths generation...");
  console.log("===================================================\n");

  // Ensure the output directory exists
  ensureDirectoryExists(pathsConfig.outputDirPath);

  // Read and parse the OpenAPI YAML file
  const openApiDoc: OpenApiDoc = readYamlFile<OpenApiDoc>(
    pathsConfig.openApiFilePath
  );

  // Generate the API paths
  const apiPaths = generateApiPaths(
    openApiDoc.paths as Record<string, unknown>
  );
  const modules = Object.keys(apiPaths);

  // Generate files for each module
  modules.forEach((module) => {
    console.log(`📝 Generating paths for module: ${module}`);
    const moduleContent = createModuleFileContent(module, apiPaths[module]);
    const moduleFilePath = path.join(
      pathsConfig.outputDirPath,
      `${module.toLowerCase()}Paths.ts`
    );
    writeFile(moduleFilePath, moduleContent);
    console.log(`✅ Module file created: ${moduleFilePath}`);
    console.log("===================================================\n");
  });

  // Generate the index file that aggregates all module paths
  console.log("🔗 Generating index file...");
  const indexContent = createIndexFileContent(modules);
  const indexPath = path.join(pathsConfig.outputDirPath, "index.ts");
  writeFile(indexPath, indexContent);
  console.log(`✅ Index file created: ${indexPath}`);
  console.log("===================================================\n");

  console.log("🎉 API Paths generation completed successfully!");
};
