/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-09
 * */
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { Authorization } from './api/middlewares/index.js';
import { CustomerRoutes, CustomerAuthRoutes } from './api/routes/routes.js';

dotenv.config();

const app = express();
const authorization = new Authorization();

app.set('trust proxy', 1); // trust first proxy
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(compression());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(express.static('./coverage/lcov-report'));
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/v1', new CustomerAuthRoutes().init());
app.use('/v1/customers', authorization.IsCustomer, new CustomerRoutes().init());

export { app };
