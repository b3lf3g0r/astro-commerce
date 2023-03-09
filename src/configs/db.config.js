/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-09
 * */
import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = {
  mongodb: {
    url:
      process.env.NODE_ENV === 'development'
        ? process.env.MONGODB_URL
        : process.env.MONGODB_URL_LIVE,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    db: process.env.REDIS_DB,
  },
};
