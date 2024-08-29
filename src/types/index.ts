export interface OpenApiDoc {
  paths: Record<string, unknown>;
}

export interface PathsConfig {
  openApiFilePath: string;
  outputDirPath: string;
}
