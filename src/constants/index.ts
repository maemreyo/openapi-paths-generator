/**
 * File: constants.ts
 *
 * This file defines default configurations, template strings, and other constants
 * that are used throughout the project. These constants help maintain consistency
 * and ensure that the codebase can be easily extended or customized as needed.
 *
 * The configuration constants (e.g., default paths, directory names) can be
 * adjusted based on the requirements of the project. Template strings are used
 * for generating content in various output files, such as module files and the
 * index file, ensuring uniformity in the generated code.
 */
export const MODULE_FILE_EXTENSION = ".ts";
export const INDEX_FILE_NAME = "index.ts";
/**
 * Template strings and other configurable constants.
 * These templates ensure that generated files have a consistent structure and
 * provide clear instructions for regenerating the files when necessary.
 */
export const FILE_HEADER_COMMENT = `
// ===========================================
// Auto-generated file from OpenAPI Specification
// ===========================================
//
// This file was generated based on the OpenAPI specification (openapi.yaml).
// Do not manually modify the contents of this file, as any changes will be
// overwritten when the file is regenerated.
//
// To regenerate this file, please follow these steps:
//   1. Ensure you have the latest "openapi.yaml" file available.
//   2. Run the command to regenerate the API paths in your project:
//
// If using npm:
// >>>>>>> npm run generate-api-paths
//
// If using yarn:
// >>>>>>> yarn generate-api-paths
//
// This process will automatically update all module files and the index file
// to reflect any changes in the OpenAPI specification.
//
// Note: The location of the "openapi.yaml" file and output directory is
// configurable based on your project setup. Please refer to your project
// documentation for specific paths and usage instructions.
//
`;
