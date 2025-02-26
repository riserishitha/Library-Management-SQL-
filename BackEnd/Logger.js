const { createLogger, format, transports } = require("winston");
const path = require("path");
require("dotenv").config();

const { combine, timestamp, printf, colorize } = format;

const LOG_FILE_PATH = process.env.LOG_FILE_PATH || path.join(__dirname, "logs", "app.log");

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level.toUpperCase()}] - ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new transports.Console({
      format: combine(colorize(), logFormat),
    }),
    new transports.File({ filename: LOG_FILE_PATH }),
  ],
});
module.exports = logger;
