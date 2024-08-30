export interface GenerateApiPathsOptions {
    openApiPath: string;
    outputDir: string;
    customName?: string;
}
export interface OpenApiDoc {
    paths: Record<string, unknown>;
}
/**
 * Generate API paths based on an OpenAPI spec file.
 * @param options - The options object containing all necessary parameters.
 */
declare const generateApiPathsFromSpec: (options: GenerateApiPathsOptions) => void;
export default generateApiPathsFromSpec;
//# sourceMappingURL=index.d.ts.map