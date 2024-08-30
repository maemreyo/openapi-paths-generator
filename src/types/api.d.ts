export interface GenerateApiPathsOptions {
  openApiPath: string; // Path to the OpenAPI YAML file
  outputDir: string; // Path to the output directory
  customName?: string; // Optional custom name for the apiPaths directory
}

export interface OpenApiDoc {
  paths: Record<string, unknown>;
}

export interface PathsConfig {
  openApiFilePath: string;
  outputDirPath: string;
}
