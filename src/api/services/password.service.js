/**
 * @fileoverview
 * @author b3lf3g0r
 * @version 1.0.0
 * @since 2023-03-10
 * */
import { mailConfig } from '../../configs/index.js';
import { PasswordTemplate } from '../templates/index.js';
import { mail } from '../../libs/index.js';

export default class PasswordService {
  constructor() {
    this.mail = mail;
    this.passwordTemplate = new PasswordTemplate();
  }

  /**
   * @method - PasswordReset
   * @description - method to send password reset email
   * @param {String} full_names - user full names
   * @param {Object} username - user email address
   * @param {String} token - The password reset token.
   * @example PasswordReset('John Doe', 'john.doe@gmail.com', 'jwt-token')
   * @returns {Promise} - A promise that resolves to a string message or rejects with an error.
   * */
  PasswordReset = (full_names, username, token) =>
    new Promise((resolve, reject) => {
      this.mail.transporter().sendMail(
        {
          from: mailConfig.nodemailer.auth.user,
          to: username,
          subject: 'Reset your Astro Commerce password',
          html: this.passwordTemplate.PasswordReset(
            full_names,
            token,
            username
          ),
        },
        // eslint-disable-next-line no-unused-vars
        (err, info) => {
          err
            ? reject(new Error(err))
            : resolve('Email sent, check your inbox or spam');
        }
      );
    });

  /**
   * @method - PasswordUpdate
   * @description - method to send password updated notification email
   * @param {String} full_names - user full names
   * @param {String} username - user email address
   * @example PasswordUpdate('John Doe', 'john.doe@gmail.com')
   * @returns {Promise} - A promise that resolves to a string message or rejects with an error.
   * */
  PasswordUpdate = (full_names, username) =>
    new Promise((resolve, reject) => {
      this.mail.nodemailer().transporter.sendMail(
        {
          from: mailConfig.nodemailer.auth.user,
          to: username,
          subject: 'Buntuthreads Password Update',
          html: this.passwordTemplate.PasswordReset(full_names),
        },
        // eslint-disable-next-line no-unused-vars
        (err, info) => {
          err ? reject(new Error(err)) : resolve();
        }
      );
    });
}
