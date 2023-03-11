/**
 * @fileoverview
 * @author b3lf3g0r
 * @version 1.0.0
 * @since 2023-03-10
 * */
import jwt from 'jsonwebtoken';

import { authConfig } from '../configs/index.js';

export default class Token {
  constructor() {
    this.key = authConfig.jwt;
  }

  /**
   * @method - AuthorizationToken
   * @description - This method generates a token for a user
   * @param {String} username - user username
   * @param {String} id - user ID
   * @param {String} role - user role
   * @example AuthorizationToken('john.doe@gmail.com', 'f5f5f5f5f5f5f5f5f5', 'customer')
   * @return {*}
   */
  AuthorizationToken = (username, id, role) =>
    jwt.sign(
      {
        id,
        username,
        role,
      },
      this.key.authorization_key,
      {
        expiresIn: '1d',
      },
      {
        algorithm: 'RS256',
      }
    );

  /**
   * @method - PasswordToken
   * @description - This method generates a password reset token for a user
   * @param {String} username - user username
   * @example PasswordToken('john.doe@gmail.com')
   * @return {*}
   */
  PasswordToken = (username) =>
    jwt.sign(
      {
        username,
      },
      this.key.password_key,
      {
        expiresIn: '15min',
      },
      {
        algorithm: 'RS256',
      }
    );
}
