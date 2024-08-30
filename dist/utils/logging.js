"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logFileCreation = exports.logCompletion = exports.logStart = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
exports.logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: "api-paths.log" }),
    ],
});
const logStart = () => {
    exports.logger.info("===================================================");
    exports.logger.info("🚀 Starting API Paths generation...");
    exports.logger.info("===================================================\n");
};
exports.logStart = logStart;
const logCompletion = () => {
    exports.logger.info("🎉 API Paths generation completed successfully!");
};
exports.logCompletion = logCompletion;
const logFileCreation = (filePath) => {
    exports.logger.info(`✅ File created: ${filePath}`);
    exports.logger.info("===================================================\n");
};
exports.logFileCreation = logFileCreation;
