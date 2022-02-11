import winston from 'winston';

const logConfiguration = {
	transports: [
		new winston.transports.Console({
			level: 'warn'
		}),
		new winston.transports.File({
			level: 'error',
			filename: 'logs/error.log'
		})
	]
};

export const logger = winston.createLogger(logConfiguration);

