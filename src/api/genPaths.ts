import {
  getTopLevelKey,
  toUpperSnakeCase,
  generatePathFunction,
} from "../utils/path";

/**
 * Generates API paths grouped by top-level keys from an OpenAPI document.
 *
 * This function processes the paths defined in an OpenAPI document, grouping
 * them by their top-level key (usually the first segment of the path). It also
 * formats the keys in UPPER_SNAKE_CASE and differentiates between "detail" paths
 * (those ending in an ID or parameter) and general paths.
 *
 * Each path is then converted into a corresponding function or string that
 * dynamically handles path parameters.
 *
 * @param paths - The paths object from the OpenAPI document, where keys are
 *                API paths and values are the corresponding operations or
 *                path details.
 * @returns An object containing grouped API paths, with each group keyed by
 *          the top-level path segment, and containing functions or strings
 *          representing the API paths.
 *
 * @example
 * const paths = {
 *   "/users/{userId}": { get: { ... }, put: { ... } },
 *   "/users": { post: { ... } },
 *   "/posts/{postId}/comments": { get: { ... } },
 * };
 *
 * const result = generateApiPaths(paths);
 * logger.info(result);
 *
 * // Output:
 * // {
 * //   USERS: {
 * //     USERS: "`/users`",
 * //     USERS_DETAIL: "({ userId }) => `/users/${userId}`"
 * //   },
 * //   POSTS: {
 * //     POSTS_COMMENTS: "({ postId }) => `/posts/${postId}/comments`"
 * //   }
 * // }
 */
export const generateApiPaths = (
  paths: Record<string, unknown>
): Record<string, Record<string, string>> => {
  return Object.entries(paths).reduce((acc, [path]) => {
    // Extract the top-level key from the path, e.g., "users" from "/users/{userId}"
    const topLevelKey = getTopLevelKey(path);

    // Remove dynamic segments (like IDs) from the path and format it
    const pathWithoutIds = path.replace(/\/\{.*?\}/g, "").replace(/^\//, "");
    const keyBase = toUpperSnakeCase(pathWithoutIds);

    // Determine if the path is a "detail" path (e.g., ends with an ID or parameter)
    const isDetail = /{[^}]+}$/.test(path);
    const key = isDetail ? `${keyBase}_DETAIL` : keyBase;

    // Generate the function or string that handles dynamic path parameters
    const pathFunction = generatePathFunction(path);

    // Initialize the top-level key object if it doesn't already exist
    if (!acc[topLevelKey]) {
      acc[topLevelKey] = {};
    }

    // Assign the generated path function or string to the appropriate key
    acc[topLevelKey][key] = pathFunction;
    return acc;
  }, {} as Record<string, Record<string, string>>);
};
