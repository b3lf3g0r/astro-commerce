/**
 * @fileoverview
 * @author b3lf3g0r
 * @version 1.0.0
 * @since 2023-03-10
 * */
import dotenv from 'dotenv';

dotenv.config();

export const mailConfig = {
  mailgen: {
    theme: 'default',
    product: {
      name: process.env.MAILGEN_APP_PRODUCT_NAME,
      link: process.env.MAILGEN_APP_LINK,
      logo: process.env.MAILGEN_APP_LOGO,
      copyright: process.env.MAILGEN_APP_COPYRIGHT,
    },
  },
  nodemailer: {
    service: process.env.NODEMAILER_SERVICE,
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    auth: {
      user: process.env.NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PASS,
    },
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    mobile: process.env.TWILIO_MOBILE,
  },
};
