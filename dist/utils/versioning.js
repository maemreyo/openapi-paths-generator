"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextVersionedDir = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Generates the next available versioned directory name based on existing directories.
 * @param baseDir - The base directory where the apiPaths directories are located.
 * @param baseName - The base name of the directory (e.g., "apiPaths").
 * @returns The next available directory name.
 */
const getNextVersionedDir = (baseDir, baseName) => {
    let version = 0;
    let dirName = baseName;
    while (fs_1.default.existsSync(path_1.default.join(baseDir, dirName))) {
        version += 1;
        dirName = `${baseName}_v${version}`;
    }
    return dirName;
};
exports.getNextVersionedDir = getNextVersionedDir;
