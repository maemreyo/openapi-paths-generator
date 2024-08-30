import path from "path";
import { promises as fsPromises } from "fs";
import crypto from "crypto";
import { writeFile } from "./file";
import { getModuleFileName, getIndexFileName } from "./naming";
import { createModuleFileContent } from "../api/genModule";
import { createIndexFileContent } from "../api/genIndex";
import { logFileCreation, logger } from "./logging";

/**
 * Generates a hash for a given content.
 * @param content - The content to hash.
 * @returns The generated hash as a string.
 */
const getHash = (content: string): string => {
  return crypto.createHash("md5").update(content).digest("hex");
};

/**
 * Determines if the file should be regenerated based on content hash comparison.
 * @param filePath - The path to the file.
 * @param content - The new content to compare.
 * @returns A boolean indicating whether the file should be regenerated.
 */
const shouldRegenerateFile = async (
  filePath: string,
  content: string
): Promise<boolean> => {
  try {
    await fsPromises.access(filePath);
    const existingContent = await fsPromises.readFile(filePath, "utf8");
    return getHash(existingContent) !== getHash(content);
  } catch (err) {
    // If the file doesn't exist, it should be regenerated
    return true;
  }
};

/**
 * Ensures that the directory for the given file path exists.
 * @param filePath - The path to the file.
 */
const ensureDirectoryExists = async (filePath: string): Promise<void> => {
  const dir = path.dirname(filePath);
  await fsPromises.mkdir(dir, { recursive: true });
};

/**
 * Processes and writes the module files in parallel with incremental updates.
 * @param moduleOutputDir - The directory where the module files will be written.
 * @param apiPaths - The generated API paths object, organized by modules.
 */
export const processModules = async (
  moduleOutputDir: string,
  apiPaths: Record<string, Record<string, string>>
): Promise<void> => {
  const modules = Object.keys(apiPaths);

  // Process each module in parallel
  await Promise.all(
    modules.map(async (module) => {
      logger.info(`📝 Generating paths for module: ${module}`);
      const moduleContent = createModuleFileContent(module, apiPaths[module]);
      const moduleFilePath = path.join(
        moduleOutputDir,
        getModuleFileName(module)
      );

      // Ensure the directory exists before writing the file
      await ensureDirectoryExists(moduleFilePath);

      // Check if the file should be regenerated
      if (await shouldRegenerateFile(moduleFilePath, moduleContent)) {
        await writeFile(moduleFilePath, moduleContent);
        logFileCreation(moduleFilePath);
      } else {
        logger.info(`⏩ Skipping unchanged module file: ${moduleFilePath}`);
      }
    })
  );

  // Generate and write the index file that aggregates all module paths
  logger.info("🔗 Generating index file...");
  const indexContent = createIndexFileContent(modules);
  const indexPath = path.join(moduleOutputDir, getIndexFileName());

  // Ensure the directory exists before writing the file
  await ensureDirectoryExists(indexPath);

  if (await shouldRegenerateFile(indexPath, indexContent)) {
    await writeFile(indexPath, indexContent);
    logFileCreation(indexPath);
  } else {
    logger.info(`⏩ Skipping unchanged index file: ${indexPath}`);
  }
};
