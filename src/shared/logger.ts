import path from 'path'
import { cwd } from 'node:process';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf, prettyPrint } = format;
import DailyRotateFile from 'winston-daily-rotate-file';

const myFormat = printf(({ level, message, label, timestamp, }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${date.toDateString()} ${hour}:${minute}:${second} [${label}] ${level}: ${message}`;
});


const SuccessLogger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Ph' }),
    timestamp(),
    myFormat,
    prettyPrint()

  ), defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(cwd(), 'Logs', 'winston', 'Success', 'Success-Log-%DATE%.log'),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })

  ],
});
const ErrorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'Ph' }),
    timestamp(),
    myFormat,
    prettyPrint()

  ), defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(cwd(), 'Logs', 'winston', 'Errors', 'Errors-Log-%DATE%.log'),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })],
});

export {
  SuccessLogger, ErrorLogger
}