import fs from "fs";
import path from "path";
/**
 * Generates the next available versioned directory name based on existing directories.
 * @param baseDir - The base directory where the apiPaths directories are located.
 * @param baseName - The base name of the directory (e.g., "apiPaths").
 * @returns The next available directory name.
 */
export const getNextVersionedDir = (baseDir, baseName) => {
    let version = 0;
    let dirName = baseName;
    while (fs.existsSync(path.join(baseDir, dirName))) {
        version += 1;
        dirName = `${baseName}_v${version}`;
    }
    return dirName;
};
