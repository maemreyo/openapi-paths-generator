import {
  getTopLevelKey,
  toUpperSnakeCase,
  generatePathFunction,
} from "../utils/path";

/**
 * Generate API paths grouped by top-level keys.
 * @param paths - The paths object from the OpenAPI document.
 * @returns An object containing grouped API paths.
 */
export const generateApiPaths = (
  paths: Record<string, unknown>
): Record<string, Record<string, string>> => {
  return Object.entries(paths).reduce((acc, [path]) => {
    const topLevelKey = getTopLevelKey(path);

    const pathWithoutIds = path.replace(/\/\{.*?\}/g, "").replace(/^\//, "");
    const keyBase = toUpperSnakeCase(pathWithoutIds);

    const isDetail = /{[^}]+}$/.test(path);
    const key = isDetail ? `${keyBase}_DETAIL` : keyBase;

    const pathFunction = generatePathFunction(path);

    if (!acc[topLevelKey]) {
      acc[topLevelKey] = {};
    }

    acc[topLevelKey][key] = pathFunction;
    return acc;
  }, {} as Record<string, Record<string, string>>);
};
