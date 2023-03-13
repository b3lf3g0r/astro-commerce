/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-12
 * */
import jwt from 'jsonwebtoken';
import { authConfig } from '../../configs/index.js';

export default class Authentication {
  constructor() {
    this.jwt_authorization_key = authConfig.jwt.authorization_key;
  }

  Authenticated = (req, res, next) => {
    // fetch jwt key
    const authorization_key = req.headers['x-authorization'];

    if (authorization_key) {
      // check if key is valid
      jwt.verify(
        authorization_key,
        this.jwt_authorization_key,
        (err, decoded) => {
          if (err) {
            return res.status(403).json({
              status_code: 403,
              data: {
                message: 'Invalid Access Key',
              },
            });
          } else {
            req.user = decoded;
            next();
          }
        }
      );
    } else {
      return res.status(401).json({
        status_code: 401,
        data: {
          message: 'You are not authenticated.',
        },
      });
    }
  };
}
