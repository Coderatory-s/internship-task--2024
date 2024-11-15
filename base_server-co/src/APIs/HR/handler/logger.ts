import { createLogger, transports, format } from 'winston';
import 'winston-mongodb';

// MongoDB URI from environment or fallback to a default URI
const mongoUri = process.env.MONGO_URI || 'http://localhost:3000/v1/authen/login';

// Create the logger
const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple(),
            ),
        }),
        // Add MongoDB transport only if `mongoUri` is available
        ...(mongoUri ? [
            new transports.MongoDB({
                db: mongoUri,
                options: { useUnifiedTopology: true },
                collection: 'logs',
            })
        ] : []), // If `mongoUri` is not available, an empty array is returned
    ],
});

export default logger;
