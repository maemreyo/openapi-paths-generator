import path from "path";

export interface PathsConfig {
  openApiFilePath: string;
  outputDirPath: string;
}

/**
 * Resolve and return the input and output paths for the OpenAPI generation.
 * @param openApiPath - Path to the OpenAPI YAML file.
 * @param outputDirPath - Path to the output directory.
 * @returns An object containing resolved input and output paths.
 */
export const resolvePaths = (
  openApiPath: string,
  outputDirPath: string
): PathsConfig => {
  return {
    openApiFilePath: path.resolve(openApiPath),
    outputDirPath: path.resolve(outputDirPath),
  };
};
