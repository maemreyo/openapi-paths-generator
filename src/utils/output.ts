import path from "path";
import { ensureDirectoryExists } from "./file";
import { getNextVersionedDir } from "./versioning";

/**
 * Handles the preparation of the output directory.
 * @param outputDir - The base output directory.
 * @param customName - Optional custom name for the apiPaths directory.
 * @returns The path to the module output directory.
 */
export const prepareOutputDirectory = (
  outputDir: string,
  customName?: string
): string => {
  ensureDirectoryExists(outputDir);
  const baseName = customName ? `apiPaths_${customName}` : "apiPaths";
  const moduleOutputDir = path.join(
    outputDir,
    getNextVersionedDir(outputDir, baseName)
  );
  ensureDirectoryExists(moduleOutputDir);

  console.log(`📂 Output directory set to: ${moduleOutputDir}`);
  console.log("===================================================\n");

  return moduleOutputDir;
};
