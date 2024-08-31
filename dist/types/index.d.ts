declare module "openapi-paths-generator" {
  /**
   * Alias for HTTP method types (e.g., 'get', 'post', etc.).
   */
  type HttpMethod =
    | "get"
    | "post"
    | "put"
    | "delete"
    | "patch"
    | "options"
    | "head";

  /**
   * Alias for a record of path items.
   */
  type Paths = Record<string, PathItem>;

  /**
   * Alias for a record of operations within a path item.
   */
  type Operations = Partial<Record<HttpMethod, Operation>>;

  /**
   * Alias for a record of responses.
   */
  type Responses = Record<string, Response>;

  /**
   * Alias for a record of media types.
   */
  type MediaTypes = Record<string, MediaType>;

  /**
   * Options for generating API paths from an OpenAPI spec file.
   */
  export interface GenerateApiPathsOptions {
    /**
     * Path to the OpenAPI YAML file.
     */
    readonly openApiPath: string;

    /**
     * Path to the output directory.
     */
    readonly outputDir: string;

    /**
     * Optional custom name for the output.
     */
    readonly customName?: string;
  }

  /**
   * Result of a file operation, indicating success or failure with a message.
   */
  export interface FileOperationResult {
    /**
     * Indicates whether the file operation was successful.
     */
    readonly success: boolean;

    /**
     * A message describing the result of the file operation.
     */
    readonly message: string;
  }

  /**
   * Options for reading a file, including encoding and file system flags.
   */
  export interface FileReadOptions {
    /**
     * The encoding used to read the file.
     */
    readonly encoding?: BufferEncoding;

    /**
     * The file system flag used for the file operation.
     */
    readonly flag?: string;
  }

  /**
   * Configuration object for resolving paths.
   */
  export interface PathsConfig {
    /**
     * Path to the OpenAPI file.
     */
    readonly openApiFilePath: string;

    /**
     * Path to the output directory.
     */
    readonly outputPath: string;
  }

  /**
   * Represents an OpenAPI document.
   */
  export interface OpenApiDoc {
    /**
     * Record of paths and their corresponding operations or details.
     */
    readonly paths: Paths;

    /**
     * Additional properties that can be included in the OpenAPI document.
     */
    readonly [key: string]: unknown;
  }

  /**
   * Represents a path item in the OpenAPI document.
   */
  export interface PathItem extends Operations {}

  /**
   * Represents an operation on a path in the OpenAPI document.
   */
  export interface Operation {
    /**
     * A short summary of what the operation does.
     */
    readonly summary?: string;

    /**
     * A detailed description of the operation.
     */
    readonly description?: string;

    /**
     * Unique identifier for the operation.
     */
    readonly operationId?: string;

    /**
     * Parameters for the operation.
     */
    readonly parameters?: readonly Parameter[];

    /**
     * The list of possible responses as they are returned from executing this operation.
     */
    readonly responses: Responses;

    /**
     * Additional properties for the operation.
     */
    readonly [key: string]: unknown;
  }

  /**
   * Represents a parameter in an OpenAPI operation.
   */
  export interface Parameter {
    /**
     * The name of the parameter.
     */
    readonly name: string;

    /**
     * The location of the parameter (e.g., 'query', 'header', 'path', 'cookie').
     */
    readonly in: "query" | "header" | "path" | "cookie";

    /**
     * Whether the parameter is required.
     */
    readonly required?: boolean;

    /**
     * The schema defining the type used for the parameter.
     */
    readonly schema?: Schema;

    /**
     * Additional properties for the parameter.
     */
    readonly [key: string]: unknown;
  }

  /**
   * Represents a response in an OpenAPI operation.
   */
  export interface Response {
    /**
     * A description of the response.
     */
    readonly description: string;

    /**
     * The content of the response, organized by media type.
     */
    readonly content?: MediaTypes;

    /**
     * Additional properties for the response.
     */
    readonly [key: string]: unknown;
  }

  /**
   * Represents a schema in OpenAPI.
   */
  export interface Schema {
    /**
     * The type of the schema (e.g., 'string', 'integer').
     */
    readonly type: string;

    /**
     * The properties included in the schema, if the schema is an object.
     */
    readonly properties?: Record<string, Schema>;

    /**
     * List of required properties.
     */
    readonly required?: readonly string[];

    /**
     * Additional properties for the schema.
     */
    readonly [key: string]: unknown;
  }

  /**
   * Represents a media type in OpenAPI.
   */
  export interface MediaType {
    /**
     * The schema defining the content of the media type.
     */
    readonly schema?: Schema;

    /**
     * An example of the media type's content.
     */
    readonly example?: unknown;

    /**
     * Additional properties for the media type.
     */
    readonly [key: string]: unknown;
  }

  /**
   * Generates API paths based on an OpenAPI spec file.
   * @param options - The options object containing all necessary parameters.
   */
  export default function generateApiPathsFromSpec(
    options: GenerateApiPathsOptions
  ): void;

  /**
   * Generates API paths based on a paths object from an OpenAPI document.
   * @param paths - The paths object from the OpenAPI document.
   * @returns An object containing grouped API paths, with each group keyed by the top-level path segment.
   */
  export function generateApiPaths(
    paths: Paths
  ): Record<string, Record<string, string>>;
}
