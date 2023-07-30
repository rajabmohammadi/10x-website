import { PrismaClient } from '@prisma/client';
import logger from './logger';
type QueryEvent = {
    type:string
    timestamp: Date
    query: string // Query sent to the database
    params: string // Query parameters
    duration: number // Time elapsed (in milliseconds) between client issuing query and database responding - not only time taken to run query
    target: string
}
type InfoEvent = {
    type: string
    timestamp: Date
    message: string
    target: string
}
type ErrorEvent = {
    type: string
    timestamp: Date
    message: string
    target: string

}

const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
});

// Event listener for Prisma Client query events
prisma.$on('query', (event) => {
    const query: QueryEvent= {
        type: 'Prisma Query',
        timestamp: event.timestamp,
        query: event.query,
        params: event.params,
        duration: event.duration,
        target: event.target
    }
    logger.info(query);
});

// Optional event listener for errors
prisma.$on('error', (event) => {
    const error: ErrorEvent = {
        type: 'Prisma Error',
        timestamp: event.timestamp,
        message: event.message,
        target: event.target
    }
    logger.error(error);
});

// Optional event listener for other events like `info`
prisma.$on('info', (event) => {
    const info: InfoEvent = {
        type: 'Prisma Error',
        timestamp: event.timestamp,
        message: event.message,
        target: event.target
    }
    logger.info(info);
});

// Now you can use `prisma` to interact with the database

export default prisma;