import winston from 'winston';
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

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    errors({ stack: true }),
    customFormat
  ),
  transports: [new winston.transports.Console()]
});

export default logger;