/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-02-19
 * */
import 'winston-daily-rotate-file';
import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config();

// export default class Logger {
//   constructor() {
//     this.path = './logs/';
//   }

//   SystemLogger = () => winston.createLogger({
//     json: true,
//     transports: [
//       new winston.transports.DailyRotateFile({
//         name: 'error',
//         level: 'error',
//         filename: './logs/%DATE%-error.log',
//         datePattern: 'YYYY-MM-DD',
//         zippedArchive: true,
//         maxSize: '20m',
//         maxFiles: '14d',
//       }),
//       new winston.transports.DailyRotateFile({
//         name: 'info',
//         level: 'info',
//         filename: './logs/%DATE%-success.log',
//         datePattern: 'YYYY-MM-DD',
//         zippedArchive: true,
//         maxSize: '20m',
//         maxFiles: '14d',
//       }),
//     ],
//   });
// };

const Logger = winston.createLogger({
  json: true,
  transports: [
    new winston.transports.DailyRotateFile({
      name: 'error',
      level: 'error',
      filename: './logs/%DATE%-error.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new winston.transports.DailyRotateFile({
      name: 'info',
      level: 'info',
      filename: './logs/%DATE%-success.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

/* if we not in production then log to the console */
if (process.env.NODE_ENV !== 'production') {
  Logger.add(
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export default Logger;
