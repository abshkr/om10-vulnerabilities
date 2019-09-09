import 'reflect-metadata';

import * as cors from 'cors';
import * as express from 'express';
import * as database from 'typeorm';
import * as parser from 'body-parser';
import * as compression from 'compression';
import graphql from './graphql';

import { CONFIG } from './constants';

database.createConnection().then(async connection => {
  const app = express();

  app.use(cors());

  app.use(parser.json());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());

  graphql.applyMiddleware({ app, path: '/v1/graphql' });

  app.listen(CONFIG.PORT, () => {
    console.log(`OMEGA API ${CONFIG.VERSION} is being served on Port ${CONFIG.PORT}`);
  });
});
