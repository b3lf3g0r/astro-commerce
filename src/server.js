/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-09
 * */
import http from 'http';
import ip from 'ip';
import { app } from './index.js';
import { database } from './libs/index.js';
import { Logger } from './utils/index.js';

const PORT = process.env.PORT || 5500;
const server = http.createServer(app);

database
  .mongoConnect()
  .then(() => {
    server.listen(PORT, () => {
      setTimeout(() => {
        Logger.info(
          `Astro Commerce Server is running on http://${ip.address()}:${PORT}`
        );
      }, 3000);
    });
  })
  .catch((MongoDBConnectionError) => {
    Logger.error(
      `[mongodb] => Failed To Establish Connection: ${MongoDBConnectionError}.`
    );
  });
