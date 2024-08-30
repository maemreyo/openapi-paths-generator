"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndexFileName = exports.getModuleFileName = void 0;
/**
 * Generates a module file name with an underscore prefix and the appropriate extension.
 * @param moduleName - The name of the module.
 * @returns The file name string.
 */
const getModuleFileName = (moduleName) => {
    return `_${moduleName.toLowerCase()}.ts`;
};
exports.getModuleFileName = getModuleFileName;
/**
 * Generates the index file name.
 * @returns The file name string for the index file.
 */
const getIndexFileName = () => {
    return "index.ts";
};
exports.getIndexFileName = getIndexFileName;
