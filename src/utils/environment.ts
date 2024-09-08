import dotenv from 'dotenv';
dotenv.config();

export const LOG_LEVEL = process.env.LOG_LEVEL ?? 'debug';

//export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

// Variables de entorno
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10): 5432;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_SYNCHRONIZE: boolean = !!(process.env.DB_SYNCHRONIZE && process.env.DB_SYNCHRONIZE.toLowerCase() === 'true');
export const DB_LOGGING: boolean = !!(process.env.DB_LOGGING && process.env.DB_LOGGING.toLowerCase() === 'true');