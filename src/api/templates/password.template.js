/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-10
 * */
import { mail } from '../../libs/index.js';

export default class PasswordTemplate {
  constructor() {
    this.mail = mail;
  }

  /**
   * @method - PasswordReset
   * @description - method to generate password reset template
   * @param {string} full_names - customer full names
   * @param {string} token - password reset token
   * @example passwordResetTemplate('John Doe', 'jwt-toekn')
   * @return {} -
   * */
  PasswordReset = (full_names, token) => {
    return this.mail.mailGen().generate({
      body: {
        title: `Hi ${full_names}.`,
        intro: 'We have received a request to reset your password.',
        action: {
          instructions:
            'To reset your password, click the button below within the next 15 minutes. If you ignore this message, your password will not be changed.',
          button: {
            color: '#22BC66',
            text: 'Resetpassword',
            link: `https://${process.env.MAILGEN_APP_LINK}/reset-password?token=${token}`,
          },
        },
        outro: `Need help, or have questions? Just reply to support@${process.env.MAILGEN_APP_LINK}, we'd love to help.`,
      },
    });
  };

  /**
   * @method - PasswordUpdate
   * @description - method to generate password update template
   * @param {string} full_names - customer full names
   * @example PasswordUpdate('John Doe')
   * @return {} -
   * */
  PasswordUpdate = (full_full_names) => {
    return this.mail.mailGen().generate({
      body: {
        title: `Hi ${full_full_names}.`,
        intro: `The password for your Astro Commerce account has been successfully updated.`,
        instructions: `If you did not request this change, please contact our support immediately here support@${process.env.MAILGEN_APP_LINK}.`,
        outro:
          "Need help, or have questions? Just reply to support@example.com, we'd love to help.",
      },
    });
  };
}
