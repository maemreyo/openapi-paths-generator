"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePaths = void 0;
const path_1 = __importDefault(require("path"));
/**
 * Resolve and return the input and output paths for the OpenAPI generation.
 * @param openApiPath - Path to the OpenAPI YAML file.
 * @param outputDirPath - Path to the output directory.
 * @returns An object containing resolved input and output paths.
 */
const resolvePaths = (openApiPath, outputDirPath) => {
    return {
        openApiFilePath: path_1.default.resolve(openApiPath),
        outputDirPath: path_1.default.resolve(outputDirPath),
    };
};
exports.resolvePaths = resolvePaths;
