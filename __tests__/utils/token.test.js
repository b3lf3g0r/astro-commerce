/* eslint-disable no-undef */
/**
 * @fileoverview
 * @author b3lf3g0r
 * @version 1.0.0
 * @since 2023-03-09
 * */
import chai from 'chai';
import jwt from 'jsonwebtoken';

import Token from '../../src/utils/token.js';

import { authConfig } from '../../src/configs/index.js';

const expect = chai.expect;
const token = new Token();

let access_token = '';
const user = {
  id: 'f5f5f5f5f5f5f5f5f5',
  username: 'john.doe@gmail.com',
  role: 'admin',
};

describe('Token Utils', () => {
  test('should generate access token', () => {
    access_token = token.AuthorizationToken(user.username, user.id, user.role);

    expect(access_token).to.not.be.undefined;
  });

  test('should verify access token', () => {
    jwt.verify(
      access_token,
      authConfig.jwt.authorization_key,
      (err, decoded) => {
        expect(decoded.username).to.be.eql(user.username);
      }
    );
  });

  test('should generate password token', () => {
    const password_token = token.PasswordToken(user.username);
    jwt.verify(password_token, authConfig.jwt.password_key, (err, decoded) => {
      expect(decoded.username).to.be.eql(user.username);
    });
  });
});
