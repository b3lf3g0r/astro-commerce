/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-13
 * */
import { Authentication } from './index.js';

export default class Authorization {
  constructor() {
    this.authentication = new Authentication();
  }

  IsCustomer = (req, res, next) => {
    this.authentication.Authenticated(req, res, () => {
      let is_customer = 0;
      for (let i = 0; i < req.user.role.length; i++) {
        is_customer |= req.user.role.charCodeAt(i) ^ 'customer'.charCodeAt(i);
      }

      if (is_customer) {
        return res.status(401).json({
          status_code: 401,
          data: {
            message: 'Access Denied',
          },
        });
      } else {
        next();
      }
    });
  };
}
