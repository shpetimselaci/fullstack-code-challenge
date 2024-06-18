import pino from 'pino';

export const runtimeLogger = pino({
  level: process.env.PINO_LOG_LEVEL || 'debug',
  timestamp: pino.stdTimeFunctions.isoTime,
});
