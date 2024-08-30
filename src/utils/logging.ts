/**
 * Logs the start of the generation process.
 */
export const logStart = () => {
  console.log("===================================================");
  console.log("🚀 Starting API Paths generation...");
  console.log("===================================================\n");
};

/**
 * Logs the completion of the generation process.
 */
export const logCompletion = () => {
  console.log("🎉 API Paths generation completed successfully!");
};

/**
 * Logs the creation of a file.
 * @param filePath - The path of the file that was created.
 */
export const logFileCreation = (filePath: string) => {
  console.log(`✅ File created: ${filePath}`);
  console.log("===================================================\n");
};
