import path from "path";
import { writeFile } from "./file";
import { getModuleFileName, getIndexFileName } from "./naming";
import { createModuleFileContent } from "../api/genModule";
import { createIndexFileContent } from "../api/genIndex";
import { logFileCreation } from "./logging";

/**
 * Processes and writes the module files.
 * @param moduleOutputDir - The directory where the module files will be written.
 * @param apiPaths - The generated API paths object, organized by modules.
 */
export const processModules = (
  moduleOutputDir: string,
  apiPaths: Record<string, Record<string, string>> // Updated type here
): void => {
  const modules = Object.keys(apiPaths);

  modules.forEach((module) => {
    console.log(`📝 Generating paths for module: ${module}`);
    const moduleContent = createModuleFileContent(module, apiPaths[module]);
    const moduleFilePath = path.join(
      moduleOutputDir,
      getModuleFileName(module)
    );
    writeFile(moduleFilePath, moduleContent);
    logFileCreation(moduleFilePath);
  });

  // Generate and write the index file that aggregates all module paths
  console.log("🔗 Generating index file...");
  const indexContent = createIndexFileContent(modules);
  const indexPath = path.join(moduleOutputDir, getIndexFileName());
  writeFile(indexPath, indexContent);
  logFileCreation(indexPath);
};
