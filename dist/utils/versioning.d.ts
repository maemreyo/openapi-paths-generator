/**
 * Generates the next available versioned directory name based on existing directories.
 * @param baseDir - The base directory where the apiPaths directories are located.
 * @param baseName - The base name of the directory (e.g., "apiPaths").
 * @returns The next available directory name.
 */
export declare const getNextVersionedDir: (baseDir: string, baseName: string) => string;
