/**
 * @fileoverview
 * @author b3lf3g0r
 * @version 1.0.0
 * @since 2023-03-09
 * */
import dotenv from 'dotenv';

dotenv.config();

export const authConfig = {
  jwt: {
    authorization_key:
      process.env.NODE_ENV === 'production'
        ? process.env.JWT_AUTHORIZATION_KEY
        : 'authorization-key',
    password_key:
      process.env.NODE_ENV === 'production'
        ? process.env.JWT_PASSWORD_KEY
        : 'password-key',
  },
};
