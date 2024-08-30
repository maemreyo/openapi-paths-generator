import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "api-paths.log" }),
  ],
});

export const logStart = () => {
  logger.info("===================================================");
  logger.info("🚀 Starting API Paths generation...");
  logger.info("===================================================\n");
};

export const logCompletion = () => {
  logger.info("🎉 API Paths generation completed successfully!");
};

export const logFileCreation = (filePath: string) => {
  logger.info(`✅ File created: ${filePath}`);
  logger.info("===================================================\n");
};
