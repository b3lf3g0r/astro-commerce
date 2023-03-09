/**
 * @fileoverview -
 * @author: afridek 
 * @version: 1.0.0
 * @since: 2023-02-28
 * */
import mongoose from 'mongoose';
import { Redis } from 'ioredis';
import { dbConfig } from '../configs/db.config.js';

export const database = {
  mongoConnect() {
    return mongoose.connect(dbConfig.mongodb.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
  mongoClose() {
    return mongoose.connection.close();
  },
  redisClient() {
    return new Redis({
      port: dbConfig.redis.port,
      host: dbConfig.redis.host,
      db: dbConfig.redis.db,
    });
  },
};
