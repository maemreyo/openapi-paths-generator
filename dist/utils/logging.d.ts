import winston from "winston";
export declare const logger: winston.Logger;
export declare const logStart: () => void;
export declare const logCompletion: () => void;
export declare const logFileCreation: (filePath: string) => void;
