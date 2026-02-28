import { Pool } from 'pg';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import logger from '../utils/logger';
import dotenv from 'dotenv';

dotenv.config();

// READ SQL FILE
import fs from 'fs';
import path from 'path';

// PostgreSQL Connection
// Support both DATABASE_URL (Render/production) and individual vars (local dev)
const pgPool = process.env.DATABASE_URL
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    })
    : new Pool({
        user: process.env.POSTGRES_USER || 'postgres',
        host: process.env.POSTGRES_HOST || 'localhost',
        database: process.env.POSTGRES_DB || 'chat_db',
        password: process.env.POSTGRES_PASSWORD || 'postgrespassword',
        port: parseInt(process.env.POSTGRES_PORT || '5432'),
    });

export const connectPg = async () => {
    try {
        await pgPool.connect();
        logger.info('PostgreSQL connected successfully');

        // Run Migration
        const sqlPath = path.join(__dirname, '../models/schema.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        await pgPool.query(sql);
        logger.info('Database Tables Initialized');

    } catch (err) {
        logger.error('PostgreSQL connection error:', err);
        process.exit(1);
    }
};

export { pgPool };

// MongoDB Connection
export const connectMongo = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://admin:mongopassword@localhost:27017/chat_db?authSource=admin';
        await mongoose.connect(mongoUri);
        logger.info('MongoDB connected successfully');
    } catch (err) {
        logger.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

// Redis Connection
export const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => logger.error('Redis Client Error', err));

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        logger.info('Redis connected successfully');
    } catch (err) {
        logger.error('Redis connection error:', err);
        process.exit(1);
    }
};
