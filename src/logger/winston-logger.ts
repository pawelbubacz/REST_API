import winston from 'winston';
import { loggerInterface } from './logger-interface';

const { combine, timestamp, errors, printf } = winston.format;

const customFormat = printf(({ level, message, timestamp, stack }) => {
  const date = new Date(timestamp as string);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const formattedTimestamp = `${hours}:${minutes} ${day}-${month}-${year}`;
  return `${formattedTimestamp} [${level}]: ${stack || message}`;
});

const env = process.env.NODE_ENV || 'production';
const logLevel = env === 'development' ? 'debug' : (process.env.LOG_LEVEL || 'info');

const winstonLogger = winston.createLogger({
  level: logLevel,
  format: combine(
    timestamp(),
    errors({ stack: true }),
    customFormat
  ),
  transports: [new winston.transports.Console()]
});

export class WinstonLogger implements loggerInterface {
  info(message: string): void {
    winstonLogger.info(message);
  }
  error(message: string): void {
    winstonLogger.error(message);
  }
  debug(message: string): void {
    winstonLogger.debug(message);
  }
}