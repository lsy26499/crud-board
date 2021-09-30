const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const { createLogger, format, transports } = winston;
const { printf, combine, timestamp, colorize } = format;

const dir = 'logs';
const loggerFormat = printf(
  (info) => `${info.timestamp} ${info.level}: ${info.message}`
);

const logger = createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    loggerFormat
  ),
  transports: [
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: dir + '/info',
      filename: `%DATE%.log`,
      maxFiles: 30,
    }),
    new winstonDaily({
      level: 'warn',
      datePattern: 'YYYY-MM-DD',
      dirname: dir + '/warn',
      filename: `%DATE%.warn.log`,
      maxFiles: 30,
    }),
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: dir + '/error',
      filename: `%DATE%.error.log`,
      maxFiles: 30,
    }),
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(colorize({ all: true }), loggerFormat),
    })
  );
}

module.exports = logger;
