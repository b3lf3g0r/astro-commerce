/**
 * @fileoverview
 * @author b3lf3g0r
 * @version 1.0.0
 * @since 2023-03-10
 * */
import validator from 'validator';

export default class Validator {
  constructor() {}

  /**
   * @method IsUsername
   * @description method to validate email
   * @param {String} email - user email
   * @example IsUsername('test@gmail.com)
   * @return {Promise<unknown>}
   * */
  IsUsername = (email) =>
    new Promise((resolve, reject) => {
      validator.isEmail(email)
        ? resolve(email)
        : reject(new Error('Please enter a valid email.'));
    });

  /**
   * @method IsMobile
   * @description method to validate mobile number with country code
   * @param mobile mobile number with country code e.g. +27761234567 or 27761234567 or 0761234567
   * @example IsMobile('+27761234567')
   * @return {Promise<unknown>}
   * */
  IsMobile = (mobile) =>
    new Promise((resolve, reject) => {
      /* remoe spaces around mobile */
      const valid_mobile = mobile.replace(/\s/g, '');
      validator.isMobilePhone(valid_mobile, ['en-ZA'])
        ? resolve(valid_mobile)
        : reject(new Error('Please enter a valid mobile number.'));
    });

  /**
   * @method - IsPassword
   * @description - method to validate user password
   * @param {String} password - user enetred password
   * @param {String} confirm_password - user password confirmation
   * @example IsPassword('password', 'password')
   * @return {Promise<unknown>} - returns a promise with either a resolved or rejected promise
   * */
  IsPassword = (password, confirm_password) =>
    new Promise((resolve, reject) => {
      let is_password_match = 0;
      for (let i = 0; i < password.length; i++) {
        is_password_match |=
          password.charCodeAt(i) ^ confirm_password.charCodeAt(i);
      }

      is_password_match
        ? reject(new Error('Sorry, passwords do not match.'))
        : !confirm_password.match(/[a-z]/g)
        ? reject(
            new Error('Password must contain at least one lowercase letter.')
          )
        : !confirm_password.match(/[A-Z]/g)
        ? reject(
            new Error('Password must contain at least one uppercase letter.')
          )
        : !confirm_password.match(/\d/g)
        ? reject(new Error('Password must contain at least one digit.'))
        : 8 > confirm_password.length
        ? reject(
            new Error('Sorry, password must be at least 8 characters long.')
          )
        : resolve(confirm_password);
    });
}
