import winston, { format } from 'winston';
import errors = format.errors;
import timestamp = format.timestamp;

const { combine, json } = winston.format;

export const logger = winston.createLogger({
    level: 'info',
    defaultMeta: { service: 'api' },
    format: combine(
        errors({ stack: true }),
        timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss',
        }),
        json()
    ),
    transports: [new winston.transports.Console()],
    exceptionHandlers: [new winston.transports.Console()],
    rejectionHandlers: [new winston.transports.Console()],
});
