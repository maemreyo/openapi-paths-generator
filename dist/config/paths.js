import path from "path";
/**
 * Resolve and return the input and output paths for the OpenAPI generation.
 * @param openApiPath - Path to the OpenAPI YAML file.
 * @param outputDirPath - Path to the output directory.
 * @returns An object containing resolved input and output paths.
 */
export const resolvePaths = (openApiPath, outputDirPath) => {
    return {
        openApiFilePath: path.resolve(openApiPath),
        outputDirPath: path.resolve(outputDirPath),
    };
};
